// PCA9685 舵机/电机驱动芯片专用库
// 适用于 Microbit

//% weight=100 color=#0066FF icon="\uf013"
namespace PCA9685 {
    const PCA9685_ADDRESS = 0x40
    const MODE1 = 0x00
    const MODE2 = 0x01
    const PRESCALE = 0xFE
    const LED0_ON_L = 0x06
    const LED0_ON_H = 0x07
    const LED0_OFF_L = 0x08
    const LED0_OFF_H = 0x09

    // 舵机通道定义
    export enum ServoChannel {
        Channel0 = 0,
        Channel1 = 1,
        Channel2 = 2,
        Channel3 = 3,
        Channel4 = 4,
        Channel5 = 5,
        Channel6 = 6,
        Channel7 = 7,
        Channel8 = 8,
        Channel9 = 9,
        Channel10 = 10,
        Channel11 = 11,
        Channel12 = 12,
        Channel13 = 13,
        Channel14 = 14,
        Channel15 = 15
    }

    // 电机通道定义
    export enum MotorChannel {
        M1A = 0,
        M1B = 1,
        M2A = 2,
        M2B = 3,
        M3A = 4,
        M3B = 5,
        M4A = 6,
        M4B = 7
    }

    let initialized = false

    // I2C 写函数
    function i2cWrite(reg: number, value: number): void {
        let buf = pins.createBuffer(2)
        buf[0] = reg
        buf[1] = value
        pins.i2cWriteBuffer(PCA9685_ADDRESS, buf)
    }

    // I2C 读函数
    function i2cRead(reg: number): number {
        pins.i2cWriteNumber(PCA9685_ADDRESS, reg, NumberFormat.UInt8BE)
        return pins.i2cReadNumber(PCA9685_ADDRESS, NumberFormat.UInt8BE)
    }

    // 设置PWM频率
    function setPWMFreq(freq: number): void {
        // 频率范围：24-1526 Hz
        let prescaleval = 25000000.0 // 25MHz
        prescaleval /= 4096.0 // 12-bit
        prescaleval /= freq
        prescaleval -= 1.0
        let prescale = Math.floor(prescaleval + 0.5)

        let oldmode = i2cRead(MODE1)
        let newmode = (oldmode & 0x7F) | 0x10 // 进入睡眠模式
        i2cWrite(MODE1, newmode)
        i2cWrite(PRESCALE, prescale)
        i2cWrite(MODE1, oldmode)
        control.waitMicros(5000)
        i2cWrite(MODE1, oldmode | 0x80)
    }

    // 设置PWM输出
    function setPWM(channel: number, on: number, off: number): void {
        if (channel < 0 || channel > 15) return

        let buf = pins.createBuffer(5)
        buf[0] = LED0_ON_L + 4 * channel
        buf[1] = on & 0xFF
        buf[2] = (on >> 8) & 0xFF
        buf[3] = off & 0xFF
        buf[4] = (off >> 8) & 0xFF
        pins.i2cWriteBuffer(PCA9685_ADDRESS, buf)
    }

    /**
     * 初始化PCA9685芯片
     * @param freq PWM频率，默认50Hz（适用于舵机）
     */
    //% block="初始化PCA9685 频率 %freq Hz"
    //% freq.defl=50
    //% freq.min=24 freq.max=1526
    //% weight=100
    export function init(freq: number = 50): void {
        if (initialized) return

        // 重置芯片
        i2cWrite(MODE1, 0x00)
        // 设置输出模式
        i2cWrite(MODE2, 0x04)
        
        setPWMFreq(freq)
        
        // 唤醒芯片
        i2cWrite(MODE1, 0x01)
        control.waitMicros(5000)
        
        initialized = true
    }

    /**
     * 设置舵机角度
     * @param channel 舵机通道 (0-15)
     * @param angle 角度 (0-180度)
     */
    //% block="设置舵机通道 %channel 角度 %angle"
    //% angle.min=0 angle.max=180
    //% weight=90
    export function setServoAngle(channel: ServoChannel, angle: number): void {
        if (!initialized) init(50)
        
        // 将角度转换为PWM脉冲宽度（0.5ms - 2.5ms）
        let pulseWidth = angle * (2000 / 180) + 500 // 500-2500微秒
        let pwmValue = Math.floor(pulseWidth * 4096 / 20000) // 转换为12位值
        
        setPWM(channel, 0, pwmValue)
    }

    /**
     * 设置舵机脉冲宽度（微秒）
     * @param channel 舵机通道 (0-15)
     * @param pulseWidth 脉冲宽度（500-2500微秒）
     */
    //% block="设置舵机通道 %channel 脉冲宽度 %pulseWidth μs"
    //% pulseWidth.min=500 pulseWidth.max=2500
    //% weight=85
    export function setServoPulse(channel: ServoChannel, pulseWidth: number): void {
        if (!initialized) init(50)
        
        let pwmValue = Math.floor(pulseWidth * 4096 / 20000) // 转换为12位值
        setPWM(channel, 0, pwmValue)
    }

    /**
     * 设置电机速度
     * @param channel 电机通道
     * @param speed 速度 (-255 到 255)
     */
    //% block="设置电机通道 %channel 速度 %speed"
    //% speed.min=-255 speed.max=255
    //% weight=80
    export function setMotorSpeed(channel: MotorChannel, speed: number): void {
        if (!initialized) init(1000) // 电机建议使用更高频率
        
        let pwmValue = Math.abs(speed) * 16 // 映射到0-4096
        if (pwmValue > 4095) pwmValue = 4095
        
        if (speed > 0) {
            // 正转
            setPWM(channel * 2, 0, pwmValue)
            setPWM(channel * 2 + 1, 0, 0)
        } else if (speed < 0) {
            // 反转
            setPWM(channel * 2, 0, 0)
            setPWM(channel * 2 + 1, 0, pwmValue)
        } else {
            // 停止
            setPWM(channel * 2, 0, 0)
            setPWM(channel * 2 + 1, 0, 0)
        }
    }

    /**
     * 设置PWM输出（直接控制）
     * @param channel PWM通道 (0-15)
     * @param on 开启时间 (0-4095)
     * @param off 关闭时间 (0-4095)
     */
    //% block="设置PWM通道 %channel ON %off OFF %off"
    //% on.min=0 on.max=4095
    //% off.min=0 off.max=4095
    //% weight=70
    export function setPWMOutput(channel: ServoChannel, on: number, off: number): void {
        if (!initialized) init(50)
        
        setPWM(channel, on, off)
    }

    /**
     * 关闭所有输出
     */
    //% block="关闭所有输出"
    //% weight=60
    export function turnOffAll(): void {
        if (!initialized) return
        
        for (let i = 0; i < 16; i++) {
            setPWM(i, 0, 0)
        }
    }

    /**
     * 设置特定通道关闭
     * @param channel 要关闭的通道
     */
    //% block="关闭通道 %channel"
    //% weight=50
    export function turnOffChannel(channel: ServoChannel): void {
        if (!initialized) return
        
        setPWM(channel, 0, 0)
    }
}