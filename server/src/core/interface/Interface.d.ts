declare interface UserInput {
    cmd?: string;
}

declare interface UserOutput {
    cmd: string;
    error?: number;
    syncInfo?: IUserData;
}

declare interface IUserData {
    uid?: string;
    nickname?: string;
    account?: string;
    password?: string;
    registerTime?: number;
    lastLoginTime?: number;
    /** 金币 */
    coin?: number;
    /** 元宝 */
    vcoin?:number;
}