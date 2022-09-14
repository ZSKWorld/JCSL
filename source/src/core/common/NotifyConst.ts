import { LogicSceneType } from "../../logicScene/LogicSceneType";

/**
 * @Author       : zsk
 * @Date         : 2022-08-05 21:17:13
 * @LastEditors  : zsk
 * @LastEditTime : 2022-08-31 23:03:26
 * @Description  : 
 */
export const enum NotifyConst {
	/**
	 * 网络消息错误
	 * @param { UserOutput } msg 错误消息
	 */
	NetMsgError = "NetMsgError",
	SocketOpened = "SocketOpened",
	SocketClosed = "SocketClosed",
	//----------------------------------以下为派发事件-------------------------------------------

	/** 打开页面，参数同uiMgr.addView*/
	AddView = "AddView",
	/** 关闭页面，参数同uiMgr.hideView */
	RemoveView = "RemoveView",
	/**
	 * 添加历练日志
	 * @param { string | string[] } log
	 */
	AddMainLog = "AddMainLog",
	/** 清除当前的历练日志 */
	ClearMainLog = "ClearMainLog",
	/**
	 * 切换场景
	 * @param { LogicSceneType } sceneType 场景类型
	 * @param { any } data 场景数据
	 */
	EnterScene = "EnterScene",
}