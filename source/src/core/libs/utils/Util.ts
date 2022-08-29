/**
 * @Author       : zsk
 * @Date         : 2022-08-05 21:17:13
 * @LastEditors  : zsk
 * @LastEditTime : 2022-08-29 21:50:04
 * @Description  : 工具方法集合
 */

import { tableMgr } from "../../table/TableManager";

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
/**获取多个物品字符串 */
export function GetItemString(items: { id: number, count: number }[], hasCount = true, color = false) {
    let str = "";
    items.forEach((v, index) => str += (color ? GetColorStr(tableMgr.Item[ v.id ].Quality, tableMgr.Item[ v.id ].Name) : tableMgr.Item[ v.id ].Name)
        + (hasCount ? `x${ v.count }` : "") + (index == items.length - 1 ? "" : "、"));
    return str;
}

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
