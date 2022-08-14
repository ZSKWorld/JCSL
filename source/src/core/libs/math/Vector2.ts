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

    add(v2: Vector2) { return this.setValue(this.x + v2.x, this.y + v2.y); }

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

    copyTo(destObject: Vector2) { destObject.setValue(this.x, this.y); }

    clone() {
        const destVector2 = new Vector2();
        this.copyTo(destVector2);
        return destVector2;
    }
}