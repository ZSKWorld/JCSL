import { InsertNotify } from "../libs/event/EventMgr";
import { Observer } from "../libs/event/Observer";
import { UpperFirst } from "../libs/utils/Util";
import { NetResponse } from "../net/NetResponse";
import { IUserData } from "../net/network/Interface";

class UserData extends Observer implements Required<IUserData> {
    uid: string;
    nickname: string;
    account: string;
    password: string;
    registerTime: number;
    lastLoginTime: number;

    @InsertNotify(NetResponse.SyncInfo)
    private syncInfo(data: IUserData) {
        Object.keys(data).forEach(v => {
            this[ v ] = data[ v ];
            this.dispatch(`${ UpperFirst(v) }_Changed`, data[ v ]);
        });
    }
}

export const userData = new UserData();
windowImmit("userData", userData)
