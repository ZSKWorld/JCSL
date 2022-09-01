/**
 * @Author       : zsk
 * @Date         : 2022-08-06 19:16:06
 * @LastEditors  : zsk
 * @LastEditTime : 2022-09-02 01:06:43
 * @Description  : 2D向量类
 */

import { MathUtil } from "./MathUtil";

export class Vector2 {
    constructor(
        public x = 0,
        public y = 0,
    ) { }

    static dot(a: Vector2, b: Vector2) { return (a.x * b.x) + (a.y * b.y); }

    get length() { return Math.sqrt(this.lengthSquared); }
    get lengthSquared() {
        const { x, y } = this;
        return x * x + y * y;
    }

    setValue(x: number, y: number) {
        this.x = x;
        this.y = y;
        return this;
    }

    add(v2: Vector2): Vector2;
    add(x: number, y?: number): Vector2;
    add(v1: Vector2 | number, v2 = 0) {
        if (typeof v1 == "number") return this.setValue(this.x + v1, this.y + v2);
        return this.setValue(this.x + v1.x, this.y + v1.y);
    }

    sub(v2: Vector2) { return this.setValue(this.x - v2.x, this.y - v2.y); }

    scale(scale: number) { return this.setValue(this.x * scale, this.y * scale); }

    dot(v2: Vector2) { return this.x * v2.x + this.y * v2.y; }

    normalize() {
        const { x, y } = this;
        let len = x * x + y * y;
        if (len > 0) {
            len = 1 / Math.sqrt(len);
            this.setValue(x * len, y * len);
        }
        return this;
    }

    /**
     * 旋转向量，角度大于0 顺时针旋转，小于0 逆时针旋转
     * @param angle 
     */
    rotate(angle: number) {
        const radian = MathUtil.AngleToRadian(angle);
        const cos = Math.cos(radian);
        const sin = Math.sin(radian);
        const { x, y } = this;
        return this.setValue(x * cos + y * sin, -x * sin + y * cos);
    }

    copyTo(v2: Vector2) { return v2.setValue(this.x, this.y); }

    clone() { return new Vector2(this.x, this.y); }
}