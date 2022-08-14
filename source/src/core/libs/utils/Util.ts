import { tableMgr } from "../../table/TableManager";
import { MathUtil } from "../math/MathUtil";


/**
 * 扩展类字段，用于在外部定义的字段在内部可读，扩展的字段或方法不能在构造期间调用
 * @param cls 要扩展的类
 * @returns
 */
export function ExtensionClass<E, T>(cls: { new(...args: any) }) {
    return cls as unknown as { new(): T & E };
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
