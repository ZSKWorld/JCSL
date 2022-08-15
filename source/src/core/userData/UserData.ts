import { InsertNotify } from "../libs/event/EventMgr";
import { Observer } from "../libs/event/Observer";
import { NetResponse } from "../net/NetResponse";
import { LoginOutput } from "../net/network/ILogin";
import { IUserData } from "../net/network/Interface";



class UserData extends Observer implements IUserData {
    uid: string;
    nickname: string;
    account: string;
    password: string;
    registerTime: number;
    lastLoginTime: number;
    coin: number;

    @InsertNotify(NetResponse.Response_Login)
    private initData(data: LoginOutput) {
        console.log(data);
        Object.keys(data.userData).forEach(v => this[ v ] = data.userData[ v ]);
    }
}

export const userData = new UserData();
windowImmit("userData", userData)
