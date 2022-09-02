import { MathUtil } from "../math/MathUtil";
import { Vector2 } from "../math/Vector2";

export class DrawState {
    private static v2Pool: Vector2[] = [];
    private _graphics: Laya.Graphics;
    private _min: number = 0;
    private _max: number = 0;
    private _duration: number = 0;
    private _ratio: number = 0;
    private _lengthes: number[] = [];
    private _center = new Vector2();
    private _directs: Vector2[] = [];
    private _starts: Vector2[] = [];
    private _targets: Vector2[] = [];
    private _updateHandler = Laya.Handler.create(this, this.draw, null, false);

    private static getV2(count: number = 1) {
        if (count <= 0) return null;
        if (count == 1) return this.v2Pool.pop() || new Vector2();
        else {
            const result: Vector2[] = [];
            for (let i = 0; i < count; i++) {
                result.push(this.v2Pool.pop() || new Vector2());
            }
            return result;
        }
    }

    private static recoverV2(v2: Vector2 | Vector2[]) {
        if (Array.isArray(v2)) {
            this.v2Pool.push(...v2);
            v2.length = 0;
        }
        else
            this.v2Pool.push(v2);
    }

    setData(sp: Laya.Sprite, count: number, min: number, max: number, duration: number) {
        if (!sp) return;
        Laya.Tween.clearAll(this);
        this._min = min;
        this._max = max;
        this._duration = duration;
        this._graphics = sp.graphics;
        this._center.setValue(sp.width / 2, sp.height / 2);
        const angle = 360 / count;
        const { _directs, _starts, _targets, _lengthes } = this;
        _lengthes.length = 0;
        DrawState.recoverV2(_directs);
        DrawState.recoverV2(_starts);
        DrawState.recoverV2(_targets);
        for (let i = 0; i < count; i++) {
            _lengthes.push(0);
            _directs.push((DrawState.getV2() as Vector2).setValue(0, -1).rotate(angle * i));
        }
        _directs.forEach(v => {
            _starts.push(v.copyTo(DrawState.getV2() as Vector2));
            _targets.push(v.copyTo(DrawState.getV2() as Vector2));
        });
        this.start();
    }

    private start() {
        this._ratio = 0;
        this._starts.forEach((v, index) => v.copyTo(this._targets[ index ]));
        this._lengthes.forEach((_, index) => this._lengthes[ index ] = MathUtil.RandomInt(this._min, this._max));
        this._directs.forEach((v, index) => v.copyTo(this._starts[ index ]).scale(this._lengthes[ index ]));
        Laya.Tween.to(this, { _ratio: 1 }, this._duration, null, Laya.Handler.create(this, this.start)).update = this._updateHandler;
    }

    private draw() {
        const { _graphics, _directs, _max, _center, _targets, _starts, _ratio, } = this;
        _graphics.clear();

        let range: number[] = _directs.reduce((pv, v) => {
            pv.push(v.x * _max, v.y * _max);
            return pv;
        }, []);
        //画范围
        _graphics.drawPoly(_center.x, _center.y, range, "#4657FF");

        let points: number[] = _targets.reduce((pv, v, index) => {
            pv.push(v.x + (_starts[ index ].x - v.x) * _ratio, v.y + (_starts[ index ].y - v.y) * _ratio);
            return pv;
        }, []);
        //画显示区
        _graphics.drawPoly(_center.x, _center.y, points, "#ff0000");
        //画显示区线框
        _graphics.drawLines(_center.x, _center.y, [ ...points, points[ 0 ], points[ 1 ] ], "#ffffff", 2);
        //画圆心
        _graphics.drawCircle(_center.x, _center.y, 4, "#00ff00");
        //画各个显示顶点
        for (let i = points.length - 2; i >= 0; i -= 2) {
            _graphics.drawCircle(_center.x + points[ i ], _center.y + points[ i + 1 ], 4, "#00ff00");
        }

        range.push(...range.reduce((pv, v, index, arr) => {
            if (index % 2 == 0) {
                pv.push(v, arr[ index + 1 ], 0, 0);
            }
            return pv;
        }, []));
        //画线框
        _graphics.drawLines(_center.x, _center.y, range, "#FFE600", 2);
    }
}