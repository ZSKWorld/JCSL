import { Util } from "../utils/Util";
import { IUserData } from "./interface/Interface";

export class UserData implements Required<IUserData> {
    uid: string = Util.CreateUID();
    nickname: string = "";
    account: string = "";
    password: string = "";
    registerTime: number = Date.now();
    lastLoginTime: number = 0;
    coin: number = 0;
    vcoin: number = 0;

    constructor(account: string = "", password: string = "", nickname: string = "") {
        this.account = String(account);
        this.password = String(password);
        this.nickname = String(nickname);
    }

    initData(data: any) {
        Object.keys(data).forEach(v => this[ v ] = data[ v ]);
        this.lastLoginTime = Date.now();
    }

    save() {
        Util.saveData(this);
    }
}