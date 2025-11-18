//094
//1d8
//1e3
//% weight=100 color=#0fbc11 icon="" block="xia_mi Board"
namespace xiamiBoard {

    let _brightness = 255
    let neopixel_buf = pins.createBuffer(16 * 3);
    for (let i = 0; i < 16 * 3; i++) {
        neopixel_buf[i] = 0
    }
     /** 
     * Set the three primary color:red, green, and blue
     */
    //% weight=84
    //% r.min=0 r.max=255
    //% g.min=0 g.max=255
    //% b.min=0 b.max=255
    //%  block="red|%r green|%g blue|%b"
    export function rgb(r: number, g: number, b: number): number {
        return (r << 16) + (g << 8) + (b);
    }

    /**
     * RGB LEDs light up from A to B 
     */
    //% weight=83
    //% from.min=0 from.max=1
    //% to.min=0 to.max=1
    //% to.defl=1
    //% from.defl=0
    //%  block="RGB LEDs |%from to|%to"
    export function ledRange(from: number, to: number): number {
        let _from=from;
        let _to=to+1;
        return (_from << 16) + (2 << 8) + (_to);
    }
    /**
     * Set the color of the specified LEDs
     */
    //% weight=82
    //% index.min=0 index.max=1
    //% index.defl=0
    //% rgb.shadow="colorNumberPicker"
    //%  block="RGB LED |%index show color|%rgb"
    export function setIndexColor(index: number, rgb: number) {
        let f = index;
        let t = index;
        let r = (rgb >> 16) * (_brightness / 255);
        let g = ((rgb >> 8) & 0xFF) * (_brightness / 255);
        let b = ((rgb) & 0xFF) * (_brightness / 255);

        if ((index) > 15) {
            if ((((index) >> 8) & 0xFF) == 0x02) {
                f = (index) >> 16;
                t = (index) & 0xff;
            } else {
                f = 0;
                t = -1;
            }
        }
        for (let i = f; i <= t; i++) {
            neopixel_buf[i * 3 + 0] = Math.round(g)
            neopixel_buf[i * 3 + 1] = Math.round(r)
            neopixel_buf[i * 3 + 2] = Math.round(b)
        }
        ws2812b.sendBuffer(neopixel_buf, DigitalPin.P15)

    }
    /**
        * Set the color of all RGB LEDs
        */
    //% weight=81
    //% rgb.shadow="colorNumberPicker"
    //%  block="show color |%rgb"
    export function showColor(rgb: number) {
        let r = (rgb >> 16) * (_brightness / 255);
        let g = ((rgb >> 8) & 0xFF) * (_brightness / 255);
        let b = ((rgb) & 0xFF) * (_brightness / 255);
        for (let i = 0; i < 16 * 3; i++) {
            if ((i % 3) == 0)
                neopixel_buf[i] = Math.round(g)
            if ((i % 3) == 1)
                neopixel_buf[i] = Math.round(r)
            if ((i % 3) == 2)
                neopixel_buf[i] = Math.round(b)
        }
        ws2812b.sendBuffer(neopixel_buf, DigitalPin.P15)
    }
    /**
     * Set the brightness of RGB LED
     */
    //% weight=80
    //% brightness.min=0 brightness.max=255
    //% block="set brightness to |%brightness"
    export function setBrightness(brightness: number) {
        _brightness = brightness;
    }
    /**
     * Turn off all RGB LEDs
     */
    //% weight=79
    //%  block="clear all LEDs"
    export function ledBlank() {
        showColor(0)
    }

}