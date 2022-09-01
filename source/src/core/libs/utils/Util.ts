/**
 * @Author       : zsk
 * @Date         : 2022-08-05 21:17:13
 * @LastEditors  : zsk
 * @LastEditTime : 2022-09-02 01:14:00
 * @Description  : 工具方法集合
 */

import { tableMgr } from "../../table/TableManager";
import { MathUtil } from "../math/MathUtil";
import { Vector2 } from "../math/Vector2";

/**
 * 扩展类字段，用于在外部定义的字段在内部可读，扩展的字段或方法不能在构造期间调用
 * @param clsT 要扩展的类
 * @returns
 */
export function ExtensionClass<E, T>(clsT: Class<T>) {
    return clsT as Class<T & E>;
}

export function GetLang(id: number) { return tableMgr.Lang[ id ].Text; }
/**根据品质获取颜色字符串 */
export function GetColorStr(id: number, text: string) { return `[color=${ tableMgr.Color[ id ].Color }]${ text }[/color]`; }

/** 大写首字母 */
export function UpperFirst(str: string, splits?: string[]) {
    if (!str) return str;
    if (str.length == 1) return str.toUpperCase();
    else {
        let temp = str[ 0 ].toUpperCase() + str.substring(1);
        if (splits && splits.length) {
            let resultArr = [ temp ];
            splits.forEach(v => {
                let count = resultArr.length;
                while (count--) {
                    resultArr.push(...resultArr.shift().split(v).map(v1 => UpperFirst(v1)));
                }
            });
            return resultArr.join("_");
        } else {
            return temp;
        }
    }
}


export function DrawState() {
    const sp: Laya.Sprite = Laya.stage.addChild(new Laya.Sprite()) as Laya.Sprite;
    sp.height = Laya.stage.height;
    sp.width = Laya.stage.width;
    sp.zOrder = 9999;
    const center = new Vector2(200, 200);
    const direct0 = new Vector2(0, -1);
    const direct1 = direct0.clone().rotate(360 / 5 * 1);
    const direct2 = direct0.clone().rotate(360 / 5 * 2);
    const direct3 = direct0.clone().rotate(360 / 5 * 3);
    const direct4 = direct0.clone().rotate(360 / 5 * 4);

    const ratio = { ratio: 0 }, min = 0, max = 200;
    const lengths = [ 0, 0, 0, 0, 0 ];

    const oldP0 = direct0.clone();
    const oldP1 = direct1.clone();
    const oldP2 = direct2.clone();
    const oldP3 = direct3.clone();
    const oldP4 = direct4.clone();
    const newP0 = direct0.clone();
    const newP1 = direct1.clone();
    const newP2 = direct2.clone();
    const newP3 = direct3.clone();
    const newP4 = direct4.clone();

    const draw = () => {
        sp.graphics.clear();
        let points = [
            direct0.x * max, direct0.y * max,
            direct1.x * max, direct1.y * max,
            direct2.x * max, direct2.y * max,
            direct3.x * max, direct3.y * max,
            direct4.x * max, direct4.y * max,
        ];
        sp.graphics.drawPoly(center.x, center.y, points, "#4657FF");
        sp.graphics.drawLines(center.x, center.y, [
            ...points,
            points[ 0 ], points[ 1 ], 0, 0,
            points[ 2 ], points[ 3 ], 0, 0,
            points[ 4 ], points[ 5 ], 0, 0,
            points[ 6 ], points[ 7 ], 0, 0,
            points[ 8 ], points[ 9 ],
        ], "#FFE600", 2);

        const scale = ratio.ratio;
        points = [
            newP0.x + (oldP0.x - newP0.x) * scale, newP0.y + (oldP0.y - newP0.y) * scale,
            newP1.x + (oldP1.x - newP1.x) * scale, newP1.y + (oldP1.y - newP1.y) * scale,
            newP2.x + (oldP2.x - newP2.x) * scale, newP2.y + (oldP2.y - newP2.y) * scale,
            newP3.x + (oldP3.x - newP3.x) * scale, newP3.y + (oldP3.y - newP3.y) * scale,
            newP4.x + (oldP4.x - newP4.x) * scale, newP4.y + (oldP4.y - newP4.y) * scale,
        ];
        sp.graphics.drawPoly(center.x, center.y, points, "#ff0000");
        sp.graphics.drawLines(center.x, center.y, [ ...points, points[ 0 ], points[ 1 ] ], "#ffffff", 2);

        sp.graphics.drawCircle(center.x, center.y, 4, "#00ff00");
        sp.graphics.drawCircle(center.x + points[ 0 ], center.y + points[ 1 ], 4, "#ffffff");
        sp.graphics.drawCircle(center.x + points[ 2 ], center.y + points[ 3 ], 4, "#ffffff");
        sp.graphics.drawCircle(center.x + points[ 4 ], center.y + points[ 5 ], 4, "#ffffff");
        sp.graphics.drawCircle(center.x + points[ 6 ], center.y + points[ 7 ], 4, "#ffffff");
        sp.graphics.drawCircle(center.x + points[ 8 ], center.y + points[ 9 ], 4, "#ffffff");
    };
    const update = new Laya.Handler(null, draw);
    const duration = 500;
    const start = () => {
        ratio.ratio = 0;
        oldP0.copyTo(newP0);
        oldP1.copyTo(newP1);
        oldP2.copyTo(newP2);
        oldP3.copyTo(newP3);
        oldP4.copyTo(newP4);
        lengths.forEach((_, index) => lengths[ index ] = MathUtil.RandomInt(min, max));
        direct0.copyTo(oldP0).scale(lengths[ 0 ]);
        direct1.copyTo(oldP1).scale(lengths[ 1 ]);
        direct2.copyTo(oldP2).scale(lengths[ 2 ]);
        direct3.copyTo(oldP3).scale(lengths[ 3 ]);
        direct4.copyTo(oldP4).scale(lengths[ 4 ]);
        Laya.Tween.to(ratio, { ratio: 1 }, duration, null, Laya.Handler.create(null, start)).update = update;
    };
    start();
}
