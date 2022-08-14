export declare const enum ErrorCode {
    None = 0,
    /** 未知的命令 */
    UnknownCmd = 1000,
    /** 未知的数据类型 */
    Unknown_Data_Type = 1001,
    /** 用户不存在 */
    USER_NOT_EXIST = 1002,
    /** 用户已存在 */
    USER_EXIST = 1003,
    /** 账号为空 */
    ACCOUNT_IS_EMPTY = 1004,
    /** 密码为空 */
    PASSWORD_IS_EMPTY = 1005,
    /** 昵称为空 */
    NICKNAME_IS_EMPTY = 1006,
    /** 异地登陆 */
    LOGIN_OTHER_PLACE = 1007
}
