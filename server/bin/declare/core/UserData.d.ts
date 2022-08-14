export declare class UserData {
    uid: string;
    nickname: string;
    account: string;
    password: string;
    constructor(account?: string, password?: string, nickname?: string);
    initData(data: any): void;
    save(): void;
}
