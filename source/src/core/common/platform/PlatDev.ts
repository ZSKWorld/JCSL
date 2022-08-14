import { userData } from "../../playerData/UserData";
import { LangCode } from "../../table/LangCode";
import { IPlatform } from "./IPlatform";

export class PlatDev implements IPlatform {
    login(account: string, password: string): Promise<LangCode> {
        return new Promise<LangCode>((resolve) => {
            resolve(null);
        });
    }
    register(account: string, password: string, nickName: string): Promise<LangCode> {
        return new Promise<LangCode>((resolve) => {
            resolve(null);
        });
    }
    confirm(msg: string, confirmText: string, showCancel: boolean, success?: Function, fail?: Function): void {
        const result = window.confirm(msg);
        if (result) success && success();
        else fail && fail();
    }
}