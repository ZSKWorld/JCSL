import { InsertNotify } from "../libs/event/EventMgr";
import { Observer } from "../libs/event/Observer";
import { Logger } from "../libs/utils/Logger";
import { UpperFirst } from "../libs/utils/Util";
import { NetResponse } from "../net/NetResponse";

const logger = Logger.Create("UserData", true);

class UserData extends Observer implements Required<IUserData> {
    uid: string;
    nickname: string;
    account: string;
    password: string;
    registerTime: number;
    lastLoginTime: number;
    coin: number;
    vcoin: number;

    @InsertNotify(NetResponse.Response_SyncInfo)
    private syncInfo(data: IUserData) {
        Object.keys(data).forEach(v => {
            const oldValue = this[ v ];
            this[ v ] = data[ v ];
            this.dispatch(`${ UpperFirst(v) }_Changed`, [ oldValue, data[ v ] ]);
        });
    }
}

export const userData: Readonly<UserData> = new UserData();
windowImmit("userData", userData);
