//% weight=100 color=#0fbc11 icon="😁" block="xia_mi Board"
namespace xiamiBoard {

    // ======================
    //        OLED 部分
    // ======================

    const basicFont: string[] = [
        "\x00\x00\x00\x00\x00\x00\x00\x00", // " "
        "\x00\x00\x5F\x00\x00\x00\x00\x00", // "!"
        "\x00\x00\x07\x00\x07\x00\x00\x00", // """
        "\x00\x14\x7F\x14\x7F\x14\x00\x00", // "#"
        "\x00\x24\x2A\x7F\x2A\x12\x00\x00", // "$"
        "\x00\x23\x13\x08\x64\x62\x00\x00", // "%"
        "\x00\x36\x49\x55\x22\x50\x00\x00", // "&"
        "\x00\x00\x05\x03\x00\x00\x00\x00", // "'"
        "\x00\x1C\x22\x41\x00\x00\x00\x00", // "("
        "\x00\x41\x22\x1C\x00\x00\x00\x00", // ")"
        "\x00\x08\x2A\x1C\x2A\x08\x00\x00", // "*"
        "\x00\x08\x08\x3E\x08\x08\x00\x00", // "+"
        "\x00\xA0\x60\x00\x00\x00\x00\x00", // ","
        "\x00\x08\x08\x08\x08\x08\x00\x00", // "-"
        "\x00\x60\x60\x00\x00\x00\x00\x00", // "."
        "\x00\x20\x10\x08\x04\x02\x00\x00", // "/"
        "\x00\x3E\x51\x49\x45\x3E\x00\x00", // "0"
        "\x00\x00\x42\x7F\x40\x00\x00\x00", // "1"
        "\x00\x62\x51\x49\x49\x46\x00\x00", // "2"
        "\x00\x22\x41\x49\x49\x36\x00\x00", // "3"
        "\x00\x18\x14\x12\x7F\x10\x00\x00", // "4"
        "\x00\x27\x45\x45\x45\x39\x00\x00", // "5"
        "\x00\x3C\x4A\x49\x49\x30\x00\x00", // "6"
        "\x00\x01\x71\x09\x05\x03\x00\x00", // "7"
        "\x00\x36\x49\x49\x49\x36\x00\x00", // "8"
        "\x00\x06\x49\x49\x29\x1E\x00\x00", // "9"
        "\x00\x00\x36\x36\x00\x00\x00\x00", // ":"
        "\x00\x00\xAC\x6C\x00\x00\x00\x00", // ";"
        "\x00\x08\x14\x22\x41\x00\x00\x00", // "<"
        "\x00\x14\x14\x14\x14\x14\x00\x00", // "="
        "\x00\x41\x22\x14\x08\x00\x00\x00", // ">"
        "\x00\x02\x01\x51\x09\x06\x00\x00", // "?"
        "\x00\x32\x49\x79\x41\x3E\x00\x00", // "@"
        "\x00\x7E\x09\x09\x09\x7E\x00\x00", // "A"
        "\x00\x7F\x49\x49\x49\x36\x00\x00", // "B"
        "\x00\x3E\x41\x41\x41\x22\x00\x00", // "C"
        "\x00\x7F\x41\x41\x22\x1C\x00\x00", // "D"
        "\x00\x7F\x49\x49\x49\x41\x00\x00", // "E"
        "\x00\x7F\x09\x09\x09\x01\x00\x00", // "F"
        "\x00\x3E\x41\x41\x51\x72\x00\x00", // "G"
        "\x00\x7F\x08\x08\x08\x7F\x00\x00", // "H"
        "\x00\x41\x7F\x41\x00\x00\x00\x00", // "I"
        "\x00\x20\x40\x41\x3F\x01\x00\x00", // "J"
        "\x00\x7F\x08\x14\x22\x41\x00\x00", // "K"
        "\x00\x7F\x40\x40\x40\x40\x00\x00", // "L"
        "\x00\x7F\x02\x0C\x02\x7F\x00\x00", // "M"
        "\x00\x7F\x04\x08\x10\x7F\x00\x00", // "N"
        "\x00\x3E\x41\x41\x41\x3E\x00\x00", // "O"
        "\x00\x7F\x09\x09\x09\x06\x00\x00", // "P"
        "\x00\x3E\x41\x51\x21\x5E\x00\x00", // "Q"
        "\x00\x7F\x09\x19\x29\x46\x00\x00", // "R"
        "\x00\x26\x49\x49\x49\x32\x00\x00", // "S"
        "\x00\x01\x01\x7F\x01\x01\x00\x00", // "T"
        "\x00\x3F\x40\x40\x40\x3F\x00\x00", // "U"
        "\x00\x1F\x20\x40\x20\x1F\x00\x00", // "V"
        "\x00\x3F\x40\x38\x40\x3F\x00\x00", // "W"
        "\x00\x63\x14\x08\x14\x63\x00\x00", // "X"
        "\x00\x03\x04\x78\x04\x03\x00\x00", // "Y"
        "\x00\x61\x51\x49\x45\x43\x00\x00", // "Z"
        "\x00\x7F\x41\x41\x00\x00\x00\x00", // "["
        "\x00\x02\x04\x08\x10\x20\x00\x00", // "\\"
        "\x00\x41\x41\x7F\x00\x00\x00\x00", // "]"
        "\x00\x04\x02\x01\x02\x04\x00\x00", // "^"
        "\x00\x80\x80\x80\x80\x80\x00\x00", // "_"
        "\x00\x01\x02\x04\x00\x00\x00\x00", // "`"
        "\x00\x20\x54\x54\x54\x78\x00\x00", // "a"
        "\x00\x7F\x48\x44\x44\x38\x00\x00", // "b"
        "\x00\x38\x44\x44\x28\x00\x00\x00", // "c"
        "\x00\x38\x44\x44\x48\x7F\x00\x00", // "d"
        "\x00\x38\x54\x54\x54\x18\x00\x00", // "e"
        "\x00\x08\x7E\x09\x02\x00\x00\x00", // "f"
        "\x00\x18\xA4\xA4\xA4\x7C\x00\x00", // "g"
        "\x00\x7F\x08\x04\x04\x78\x00\x00", // "h"
        "\x00\x00\x7D\x00\x00\x00\x00\x00", // "i"
        "\x00\x80\x84\x7D\x00\x00\x00\x00", // "j"
        "\x00\x7F\x10\x28\x44\x00\x00\x00", // "k"
        "\x00\x41\x7F\x40\x00\x00\x00\x00", // "l"
        "\x00\x7C\x04\x18\x04\x78\x00\x00", // "m"
        "\x00\x7C\x08\x04\x7C\x00\x00\x00", // "n"
        "\x00\x38\x44\x44\x38\x00\x00\x00", // "o"
        "\x00\xFC\x24\x24\x18\x00\x00\x00", // "p"
        "\x00\x18\x24\x24\xFC\x00\x00\x00", // "q"
        "\x00\x00\x7C\x08\x04\x00\x00\x00", // "r"
        "\x00\x48\x54\x54\x24\x00\x00\x00", // "s"
        "\x00\x04\x7F\x44\x00\x00\x00\x00", // "t"
        "\x00\x3C\x40\x40\x7C\x00\x00\x00", // "u"
        "\x00\x1C\x20\x40\x20\x1C\x00\x00", // "v"
        "\x00\x3C\x40\x30\x40\x3C\x00\x00", // "w"
        "\x00\x44\x28\x10\x28\x44\x00\x00", // "x"
        "\x00\x1C\xA0\xA0\x7C\x00\x00\x00", // "y"
        "\x00\x44\x64\x54\x4C\x44\x00\x00", // "z"
        "\x00\x08\x36\x41\x00\x00\x00\x00", // "{"
        "\x00\x00\x7F\x00\x00\x00\x00\x00", // "|"
        "\x00\x41\x36\x08\x00\x00\x00\x00", // "}"
        "\x00\x02\x01\x01\x02\x01\x00\x00"  // "~"
    ];

    function initDisplay(): void {
        OLEDcmd(0xAE);  // Display OFF
        OLEDcmd(0xD5); OLEDcmd(0x80);
        OLEDcmd(0xA8); OLEDcmd(0x3F);
        OLEDcmd(0xD3); OLEDcmd(0x00);
        OLEDcmd(0x40);
        OLEDcmd(0x8D); OLEDcmd(0x14);
        OLEDcmd(0xA1); OLEDcmd(0xC8);
        OLEDcmd(0xDA); OLEDcmd(0x12);
        OLEDcmd(0x81); OLEDcmd(0xCF);
        OLEDcmd(0xD9); OLEDcmd(0xF1);
        OLEDcmd(0xDB); OLEDcmd(0x40);
        OLEDcmd(0xA4); OLEDcmd(0xA6);
        OLEDcmd(0xAF);  // Display ON
        OLEDclear();
    }

    function OLEDcmd(c: number) {
        pins.i2cWriteNumber(0x3C, c, NumberFormat.UInt16BE);
    }

    function OLEDwriteData(n: number) {
        let b = n;
        if (n < 0) n = 0;
        if (n > 255) n = 255;
        pins.i2cWriteNumber(0x3C, 0x4000 + b, NumberFormat.UInt16BE);
    }

    function OLEDsetText(row: number, column: number) {
        let r = Math.max(0, Math.min(7, row));
        let c = Math.max(0, Math.min(15, column));
        OLEDcmd(0xB0 + r);
        OLEDcmd(0x00 + ((8 * c) & 0x0F));
        OLEDcmd(0x10 + (((8 * c) >> 4) & 0x0F));
    }

    function OLEDputChar(ch: string) {
        let code = ch.charCodeAt(0);
        if (code < 32 || code > 126) code = 32;
        let glyph = basicFont[code - 32];
        for (let i = 0; i < 8; i++) {
            OLEDwriteData(glyph.charCodeAt(i));
        }
    }

    /**
     * OLED 显示文本
     */
    //% weight=90
    //% text.defl="DFRobot"
    //% line.min=0 line.max=7
    //% column.min=0 column.max=15
    //% block="OLED show text %text on line %line column %column"
    export function OLEDshowUserText(text: string, line: number, column: number): void {
        OLEDsetText(line, column);
        let maxChars = 16 - column;
        if (maxChars <= 0) return;
        let displayText = text.substring(0, maxChars);
        for (let c of displayText) {
            OLEDputChar(c);
        }
    }

    /**
     * OLED 显示数字
     */
    //% weight=89
    //% line.min=0 line.max=7
    //% column.min=0 column.max=15
    //% block="OLED show number %n on line %line column %column"
    export function OLEDshowUserNumber(n: number, line: number, column: number): void {
        OLEDshowUserText("" + n, line, column);
    }

    /**
     * 清空整个 OLED
     */
    //% weight=88
    //% block="clear OLED"
    export function OLEDclear(): void {
        for (let j = 0; j < 8; j++) {
            OLEDsetText(j, 0);
            for (let i = 0; i < 16; i++) {
                OLEDputChar(' ');
            }
        }
    }

    /**
     * 清空某一行的部分列
     */
    //% weight=87
    //% block="clear OLED line %line column %column1 to %column2"
    //% line.min=0 line.max=7
    //% column1.min=0 column1.max=15
    //% column2.min=0 column2.max=15
    export function clear(line: number, column1: number, column2: number): void {
        OLEDsetText(line, column1);
        let count = Math.max(0, column2 - column1 + 1);
        for (let i = 0; i < count; i++) {
            OLEDputChar(' ');
        }
    }


    // ======================
    //      超声波部分
    // ======================

    /**
     * 获取超声波传感器距离（cm）
     */
    //% weight=85
    //% blockId=ultrasonic_sensor
    //% block="get ultrasonic sensor (cm)"
    export function Ultrasonic(maxCmDistance = 500): number {
        let d: number;
        pins.digitalWritePin(DigitalPin.P0, 1);
        basic.pause(1);
        pins.digitalWritePin(DigitalPin.P0, 0);

        if (pins.digitalReadPin(DigitalPin.P1) == 0) {
            pins.digitalWritePin(DigitalPin.P0, 0);
            pins.digitalWritePin(DigitalPin.P0, 1);
            pins.digitalWritePin(DigitalPin.P0, 0);
            d = pins.pulseIn(DigitalPin.P1, PulseValue.High, maxCmDistance * 58);
        } else {
            pins.digitalWritePin(DigitalPin.P0, 1);
            pins.digitalWritePin(DigitalPin.P0, 0);
            d = pins.pulseIn(DigitalPin.P1, PulseValue.Low, maxCmDistance * 58);
        }

        let x = d / 59;
        if (x <= 0 || x > 500) return 0;
        return Math.round(x);
    }


    // ======================
    //       RGB LED 部分
    // ======================

    let _brightness = 255;
    const NUM_PIXELS = 16;
    let neopixel_buf = pins.createBuffer(NUM_PIXELS * 3);
    for (let i = 0; i < NUM_PIXELS * 3; i++) {
        neopixel_buf[i] = 0;
    }

    /**
     * 创建 RGB 颜色值
     */
    //% weight=84
    //% r.min=0 r.max=255
    //% g.min=0 g.max=255
    //% b.min=0 b.max=255
    //% block="red|%r green|%g blue|%b"
    export function rgb(r: number, g: number, b: number): number {
        return (r << 16) + (g << 8) + b;
    }

    /**
     * 设置单个或范围 LED 的颜色
     */
    //% weight=83
    //% from.min=0 from.max=15
    //% to.min=0 to.max=15
    //% to.defl=0
    //% from.defl=0
    //% block="RGB LEDs |%from to|%to"
    export function ledRange(from: number, to: number): number {
        return (from << 16) + (2 << 8) + (to + 1);
    }

    /**
     * 设置指定 LED 的颜色
     */
    //% weight=82
    //% index.min=0 index.max=15
    //% index.defl=0
    //% rgb.shadow="colorNumberPicker"
    //% block="RGB LED |%index show color|%rgb"
    export function setIndexColor(index: number, rgb: number): void {
        let f = index;
        let t = index;
        if (index > 15) {
            if (((index >> 8) & 0xFF) == 0x02) {
                f = (index >> 16);
                t = (index & 0xFF) - 1;
            } else {
                return;
            }
        }
        let r = ((rgb >> 16) & 0xFF) * (_brightness / 255);
        let g = ((rgb >> 8) & 0xFF) * (_brightness / 255);
        let b = (rgb & 0xFF) * (_brightness / 255);

        for (let i = f; i <= t; i++) {
            if (i >= 0 && i < NUM_PIXELS) {
                neopixel_buf[i * 3 + 0] = Math.round(g);
                neopixel_buf[i * 3 + 1] = Math.round(r);
                neopixel_buf[i * 3 + 2] = Math.round(b);
            }
        }
        ws2812b.sendBuffer(neopixel_buf, DigitalPin.P15);
    }

    /**
     * 设置所有 RGB LED 颜色
     */
    //% weight=81
    //% rgb.shadow="colorNumberPicker"
    //% block="show color |%rgb"
    export function showColor(rgb: number): void {
        let r = ((rgb >> 16) & 0xFF) * (_brightness / 255);
        let g = ((rgb >> 8) & 0xFF) * (_brightness / 255);
        let b = (rgb & 0xFF) * (_brightness / 255);
        for (let i = 0; i < NUM_PIXELS * 3; i += 3) {
            neopixel_buf[i] = Math.round(g);
            neopixel_buf[i + 1] = Math.round(r);
            neopixel_buf[i + 2] = Math.round(b);
        }
        ws2812b.sendBuffer(neopixel_buf, DigitalPin.P15);
    }

    /**
     * 设置亮度
     */
    //% weight=80
    //% brightness.min=0 brightness.max=255
    //% block="set brightness to |%brightness"
    export function setBrightness(brightness: number): void {
        _brightness = Math.max(0, Math.min(255, brightness));
    }

    /**
     * 关闭所有 RGB LED
     */
    //% weight=79
    //% block="clear all LEDs"
    export function ledBlank(): void {
        showColor(0);
    }


    // ======================
    //      红外接收部分
    // ======================

    let irstate: number = -1;
    let irListening: boolean = false;

    //% advanced=true shim=maqueenIRV2::irCode
    function irCode(): number {
        return 0;
    }

    /**
     * 读取红外按键值
     */
    //% weight=78
    //% blockId=IR_read
    //% block="read IR key value"
    export function IR_read(): number {
        pins.setPull(DigitalPin.P13, PinPullMode.PullUp);
        let val = irCode() & 0x00FF;
        return val === 0 ? -1 : val;
    }

    /**
     * 红外接收回调
     */
    //% weight=77
    //% blockId=IR_callbackUser
    //% block="on IR received"
    //% draggableParameters
    export function IR_callbackUser(cb: (message: number) => void): void {
        pins.setPull(DigitalPin.P13, PinPullMode.PullUp);
        irListening = true;
        control.onEvent(11, 22, function () {
            if (irstate !== -1) {
                cb(irstate);
            }
        });
    }

    // 后台轮询红外信号
    basic.forever(() => {
        if (irListening) {
            let val = IR_read();
            if (val !== -1) {
                irstate = val;
                control.raiseEvent(11, 22);
                basic.pause(150); // 防重复触发
            }
        }
        basic.pause(20);
    });


    // ======================
    //     初始化函数
    // ======================

    /**
     * 初始化 xia_mi Board（仅初始化 OLED）
     */
    //% block="init xia_mi Board"
    //% weight=101
    export function initXiaMiBoard(): void {
        basic.pause(30);
        initDisplay();
    }
}