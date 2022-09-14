import { BaseViewCtrl } from "./BaseViewCtrl";
import { BaseViewCtrlProxy } from "./BaseViewCtrlProxy";
import { Layer } from "./GameLayer";
import { ViewID } from "./ViewID";
/**
 * @Author       : zsk
 * @Date         : 2022-08-05 21:17:13
 * @LastEditors  : zsk
 * @LastEditTime : 2022-09-13 08:42:51
 * @Description  : 定义页面及控制器类型和扩展
 */
export const enum ViewCtrlEvents {
	/** 页面控制器前置事件 */
	OnForeground = "OnForeground",
	/** 页面控制器后置事件 */
	OnBackground = "OnBackground",
}

export interface GComponentExtend {

	/**派发全局事件 */
	dispatch?(notifyName: string, data?: any): void;
	/**
	 * 打开页面
	 * @param viewId 页面id
	 * @param data 传入参数
	 * @param callback 打开后回调
	 * @param hideTop 是否隐藏上一页面
	 */
	addView?<T = any>(viewId: ViewID, data?: T, callback?: Laya.Handler, hideTop?: boolean): void;

	/**移除最上层页面 */
	removeTop?(): void;

	/**移除所有页面 */
	removeAll?(): void;

	/** 移除页面
	 * @param viewId 页面id
	 */
	removeView?(viewId: ViewID): void;
}

/**开放给页面和控制器的页面方法 */
interface IViewMethod extends GComponentExtend {

	/** 移除当前页面 */
	removeSelf?(): void;
}

interface IViewCommon {
	viewId:ViewID;
	userData?: Readonly<IUserData>;
}

/**页面实例类型 */
export type IView = fgui.GComponent & ViewExtension;

/**页面类类型 */
export interface IView_Class {
	new(): IView;
	PkgRes?: string;
	/** 是否不可销毁 */
	DontDestroy?: boolean;
	createInstance?(): IView;
};

/**页面扩展 */
export interface ViewExtension extends IViewMethod, IViewCommon {
	layer?: Layer;
	listener?: Laya.EventDispatcher;
	viewCtrl?: IViewCtrl;

	/**
	 * 页面创建完毕之后执行，只执行一次。
	 * 该方法为虚方法，使用时重写即可
	 */
	onCreate?(): void;

	/**向控制器发送消息 */
	sendMessage?(type: string, data?: any): void;

	/**
	 * @description 初始化页面
	 * @param viewId 页面ID
	 * @param viewInst 组件页面对象
	 * @param listener 页面消息监听器
	 */
	initView?(viewId: ViewID, viewInst: IView, listener: Laya.EventDispatcher, data?: any): void;
};


/**页面控制器实例类型 */
export type IViewCtrl = BaseViewCtrl & ViewCtrlExtension;

/**页面控制器类类型 */
export type IViewCtrl_Class = new () => IViewCtrl;

/**页面控制器扩展 */
export interface ViewCtrlExtension extends IViewMethod, IViewCommon {
};


export type IViewCtrlProxy = BaseViewCtrlProxy;

export type IViewCtrlProxy_Class = new () => IViewCtrlProxy;
