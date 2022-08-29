import { InsertNotify } from "../libs/event/EventMgr";
import { Observer } from "../libs/event/Observer";
import { UpperFirst } from "../libs/utils/Util";
import { NetResponse } from "../net/NetResponse";
import { IUserData } from "../net/network/Interface";

/**
 * @Author       : zsk
 * @Date         : 2022-08-05 21:17:13
 * @LastEditors  : zsk
 * @LastEditTime : 2022-08-29 21:57:39
 * @Description  : 玩家数据
 */
class UserData extends Observer implements Required<IUserData> {
    uid: string;
    nickname: string;
    account: string;
    password: string;
    registerTime: number;
    lastLoginTime: number;
    coin: number;

    @InsertNotify(NetResponse.SyncInfo)
    private syncInfo(data: IUserData) {
        Object.keys(data).forEach(v => {
            this[ v ] = data[ v ];
            this.dispatch(`${ UpperFirst(v) }_Changed`, data[ v ]);
        });
    }
}

export const userData: Readonly<UserData> = new UserData();
windowImmit("userData", userData);
