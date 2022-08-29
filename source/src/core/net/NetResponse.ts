/**
 * @Author       : zsk
 * @Date         : 2022-08-15 23:19:44
 * @LastEditors  : zsk
 * @LastEditTime : 2022-08-29 21:34:11
 * @Description  : 服务器响应事件
 */
export const enum NetResponse {
	SyncInfo = "SyncInfo",
	/** @param HeartOutput */
	Response_Heart = "Response_Heart",
	/** @param RegisterOutput */
	Response_Register = "Response_Register",
	/** @param LoginOutput */
	Response_Login = "Response_Login",
}