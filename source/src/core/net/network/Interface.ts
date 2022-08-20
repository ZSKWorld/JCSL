export interface UserInput {
    cmd?: string,
}

export interface UserOutput {
    cmd: string,
    error?: number;
    syncInfo?: IUserData;
}

export interface IUserData {
    uid?: string;
    nickname?: string;
    account?: string;
    password?: string;
    registerTime?: number;
    lastLoginTime?: number;
    /** 金币 */
    coin?: number;
}