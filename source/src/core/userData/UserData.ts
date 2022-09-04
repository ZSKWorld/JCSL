import { InsertNotify } from "../libs/event/EventMgr";
import { Observer } from "../libs/event/Observer";
import { Logger } from "../libs/utils/Logger";
import { UpperFirst } from "../libs/utils/Util";
import { NetResponse } from "../net/NetResponse";

const logger = Logger.Create("UserData").setEnable(true);

/**
 * @Author       : zsk
 * @Date         : 2022-08-05 21:17:13
 * @LastEditors  : zsk
 * @LastEditTime : 2022-09-04 20:43:17
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
    vcoin: number;

    @InsertNotify(NetResponse.SyncInfo)
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
