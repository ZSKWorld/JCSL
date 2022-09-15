import { LogicSceneType } from "../../logicScene/LogicSceneType";

/**
 * @Author       : zsk
 * @Date         : 2022-08-05 21:17:13
 * @LastEditors  : zsk
 * @LastEditTime : 2022-09-15 23:54:41
 * @Description  : 
 */
export const enum NotifyConst {
	/**
	 * 网络消息错误
	 * @param { UserOutput } msg 错误消息
	 */
	NetMsgError = "NetMsgError",
	/** socket连接 */
	SocketOpened = "SocketOpened",
	/** socket关闭 */
	SocketClosed = "SocketClosed",

	//----------------------------------以下为派发事件-------------------------------------------

	/**
	 * 切换场景
	 * @param { LogicSceneType } sceneType 场景类型
	 * @param { any } data 场景数据
	 */
	EnterScene = "EnterScene",
}