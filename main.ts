
/**
 * 独立 PCA9685 PWM 驱动模块
 * I2C 地址默认为 0x40
 * 支持 16 路 PWM 输出，可用于舵机、LED、电机等
 */

//% weight=100 color=#0078D7 icon="\uf0e4"
namespace PCA9685 {
    const PCA9685_ADDRESS = 0x40
    const MODE1 = 0x00
    const MODE2 = 0x01
    const PWM_CH = 0x06
    const PRESCALE = 0xFE

    let initialized = false

    function i2cwrite(addr: number, reg: number, value: number) {
        let buf = pins.createBuffer(2)
        buf[0] = reg
        buf[1] = value
        pins.i2cWriteBuffer(addr, buf)
    }

    function i2cread(addr: number, reg: number): number {
        pins.i2cWriteNumber(addr, reg, NumberFormat.UInt8BE)
        return pins.i2cReadNumber(addr, NumberFormat.UInt8BE)
    }

    /**
     * 初始化 PCA9685 芯片
     */
    function init(): void {
        if (initialized) return;

        // 直接操作 I2C，不调用 setPwm
        i2cwrite(PCA9685_ADDRESS, MODE1, 0x00); // Normal mode
        setFrequency(50);

        // 手动清零所有 PWM 通道（不通过 setPwm）
        for (let i = 0; i < 16; i++) {
            let buf = pins.createBuffer(5);
            buf[0] = PWM_CH + 4 * i;
            buf[1] = 0; // on low
            buf[2] = 0; // on high
            buf[3] = 0; // off low
            buf[4] = 0; // off high
            pins.i2cWriteBuffer(PCA9685_ADDRESS, buf);
        }

        initialized = true;
    }

    /**
     * 设置 PWM 频率（Hz）
     * @param freq 频率，单位 Hz，建议范围 24~1526
     */
    export function setFrequency(freq: number): void {
        // 计算预分频值：prescale = round(osc_clock / (4096 * freq)) - 1
        // PCA9685 内部时钟为 25MHz
        let prescaleval = 25000000.0
        prescaleval /= 4096.0
        prescaleval /= freq
        prescaleval -= 1.0
        let prescale = Math.clamp(3, 255, Math.round(prescaleval))

        let oldmode = i2cread(PCA9685_ADDRESS, MODE1)
        let newmode = (oldmode & 0x7F) | 0x10 // sleep
        i2cwrite(PCA9685_ADDRESS, MODE1, newmode) // go to sleep
        i2cwrite(PCA9685_ADDRESS, PRESCALE, prescale) // set prescaler
        i2cwrite(PCA9685_ADDRESS, MODE1, oldmode)
        control.waitMicros(5000)
        i2cwrite(PCA9685_ADDRESS, MODE1, oldmode | 0xA1) // auto-increment + restart
    }

    /**
     * 设置指定通道的 PWM 占空比
     * @param channel 通道号 (0~15)
     * @param on 开始计数点 (0~4095)
     * @param off 结束计数点 (0~4095)
     */
    export function setPwm(channel: number, on: number, off: number): void {
        if (channel < 0 || channel > 15) return
        if (!initialized) init()

        on = Math.clamp(0, 4095, on)
        off = Math.clamp(0, 4095, off)

        let buf = pins.createBuffer(5)
        buf[0] = PWM_CH + 4 * channel
        buf[1] = on & 0xFF
        buf[2] = (on >> 8) & 0xFF
        buf[3] = off & 0xFF
        buf[4] = (off >> 8) & 0xFF
        pins.i2cWriteBuffer(PCA9685_ADDRESS, buf)
    }

    /**
     * 设置通道为固定占空比（简化接口）
     * @param channel 通道 (0~15)
     * @param duty 占空比 (0.0 ~ 1.0)
     */
    //% block="Set PWM channel %channel|duty %duty"
    //% channel.min=0 channel.max=15
    //% duty.min=0 duty.max=1
    //% blockGap=8
    export function setDuty(channel: number, duty: number): void {
        duty = Math.clamp(0, 1, duty)
        let off = Math.round(duty * 4095)
        setPwm(channel, 0, off)
    }

    /**
     * 设置舵机角度（假设频率为 50Hz）
     * @param channel 通道 (0~15)
     * @param degree 角度 (0~180)
     */
    //% block="Servo channel %channel|to %degree °"
    //% channel.min=0 channel.max=15
    //% degree.min=0 degree.max=180
    export function servoWrite(channel: number, degree: number): void {
        if (!initialized) init()
        degree = Math.clamp(0, 180, degree)
        // 脉宽 0.6ms (0°) ~ 2.4ms (180°) → 150 ~ 600 in 4096@50Hz
        // 更精确：us = 600 + degree * 10
        let us = 600 + degree * 10  // 600~2400 μs
        let value = (us * 4096) / 20000  // 20000μs = 20ms 周期
        setPwm(channel, 0, Math.round(value))
    }

    /**
     * 停止所有输出（设为 0）
     */
    //% block="Stop all PCA9685 channels"
    export function stopAll(): void {
        if (!initialized) init()
        for (let i = 0; i < 16; i++) {
            setPwm(i, 0, 0)
        }
    }


    /**
     * 设置指定通道为数字高/低电平（用于 LED 等）
     * @param channel 通道 (0~15)
     * @param value true 为高电平（亮），false 为低电平（灭）
     */
    //% block="Digital write channel %channel|to %value"
    //% channel.min=0 channel.max=15
    //% value.shadow="toggleOnOff"
    //% blockGap=8
    export function digitalWrite(channel: number, value: boolean): void {
        if (!initialized) init();
        if (channel < 0 || channel > 15) return;
        if (value) {
            setPwm(channel, 0, 4095); // 全开 ≈ 高电平
        } else {
            setPwm(channel, 0, 0);    // 全关 = 低电平
        }
    }

    /**
     * 控制 HT7K1311 电机：正转
     * IN1 = HIGH, IN2 = LOW
     */
    //% block="HT7K1311 Motor Forward"
    //% blockGap=8
    export function motorForward(): void {
        if (!initialized) init();
        digitalWrite(11, true);   // IN1 = HIGH
        digitalWrite(12, false);  // IN2 = LOW
    }

    /**
     * 控制 HT7K1311 电机：反转
     * IN1 = LOW, IN2 = HIGH
     */
    //% block="HT7K1311 Motor Reverse"
    //% blockGap=8
    export function motorReverse(): void {
        if (!initialized) init();
        digitalWrite(11, false);  // IN1 = LOW
        digitalWrite(12, true);   // IN2 = HIGH
    }

    /**
     * 控制 HT7K1311 电机：停止（刹车）
     * IN1 = LOW, IN2 = LOW
     */
    //% block="HT7K1311 Motor Stop"
    //% blockGap=8
    export function motorStop(): void {
        if (!initialized) init();
        digitalWrite(11, false);
        digitalWrite(12, false);
    }
}