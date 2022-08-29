/**
 * @Author       : zsk
 * @Date         : 2022-08-17 22:38:50
 * @LastEditors  : zsk
 * @LastEditTime : 2022-08-29 21:57:49
 * @Description  : 玩家数据变化事件
 */
export const enum UserDataEvent {
	Uid_Changed = "Uid_Changed",
	Nickname_Changed = "Nickname_Changed",
	Account_Changed = "Account_Changed",
	Password_Changed = "Password_Changed",
	RegisterTime_Changed = "RegisterTime_Changed",
	LastLoginTime_Changed = "LastLoginTime_Changed",
	Coin_Changed = "Coin_Changed",
}