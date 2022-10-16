import { LogicSceneType } from "../../logicScene/LogicSceneType";

export const enum NotifyConst {
	/**
	 * 网络消息错误
	 * @param msg {@link UserOutput} 错误消息
	 */
	NetMsgError = "NetMsgError",
	/** socket连接 */
	SocketOpened = "SocketOpened",
	/** socket关闭 */
	SocketClosed = "SocketClosed",

	//----------------------------------以下为派发事件-------------------------------------------
	/**
	 * 切换场景
	 * @param sceneType {@link LogicSceneType} 场景类型
	 * @param data {@link Object }  场景数据
	 */
	EnterScene = "EnterScene",
}