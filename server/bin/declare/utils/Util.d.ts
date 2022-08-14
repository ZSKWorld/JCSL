import { UserData } from "../core/UserData";
export declare class Util {
    /**生成uid */
    static CreateUID(): string;
    static getData(account: string, password: string): any;
    static saveData(data: UserData): void;
    private static getDataPath;
}
