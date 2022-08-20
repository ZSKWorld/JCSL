import { UserOutput } from "../net/network/Interface";

export const enum NotifyConst {
	/** 基本数据改变事件，无参 */
	BaseDataChanged = "BaseDataChanged",
	/** 背包数据改变事件，无参  */
	BagDataChanged = "BagDataChanged",
	/**
	 * 升级事件
	 * @param { number } level 等级
	 */
	Upgrade = "Upgrade",
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
	RemoveView = "HideView",
	/**
	 * 添加历练日志
	 * @param { string | string[] } log
	 */
	AddMainLog = "AddMainLog",
	/** 清除当前的历练日志 */
	ClearMainLog = "ClearMainLog",
	/**
	 * 切换场景
	 * @param { SceneType } sceneType 场景类型
	 * @param { any } data 场景数据
	 */
	EnterScene = "EnterScene",
}