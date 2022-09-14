import { eventMgr } from "../../libs/event/EventMgr";
import { ExtensionClass } from "../../libs/utils/Util";
import { IView, IViewCtrlProxy, ViewCtrlEvents, ViewCtrlExtension } from "./Interfaces";
import { ProxyClass } from "./UIGlobal";
import { DIViewCtrl, ViewCtrlDIExtend } from "./ViewCtrlDIExtend";

/**
 * @Author       : zsk
 * @Date         : 2021-08-20 21:36:21
 * @LastEditors  : zsk
 * @LastEditTime : 2022-09-14 20:43:29
 * @Description  : UI控制器脚本基类，可挂在任何Laya.Node（GUI的displayObject）上。
 * @Description  : 该组件为可回收组件。鼠标、键盘交互事件可使用装饰器注册 => InsertKeyEvent、InsertMouseEvent
 */
export abstract class BaseViewCtrl<V extends IView = IView, D = any> extends ExtensionClass<ViewCtrlExtension, Laya.Script>(Laya.Script) {
	/** 页面数据 */
	data: D;
	/** 控制器挂载的ui页面 */
	private _view: V;
	/** 页面消息中心 */
	private _listener: Laya.EventDispatcher;
	/** 控制器网络回包代理 */
	private _proxy: IViewCtrlProxy;
	/** 子页面控制器集合 */
	private _subCtrls: BaseViewCtrl[] = [];

	get view() { return this._view; }
	get listener() { return this._listener; }
	set listener(value: Laya.EventDispatcher) {
		if (value && value != this._listener) {
			if (this._listener) {
				this._listener.offAll();
				Laya.Pool.recoverByClass(this._listener);
			}
			this._listener = value;
		}
	}
	get proxy() { return this._proxy; }
	get subCtrls() { return this._subCtrls; }

	override onAwake() {
		eventMgr.registerNotify(this);
		eventMgr.registerNotify(this._view);
		eventMgr.registerNotify(this.proxy);
		ViewCtrlDIExtend.registerDeviceEvent(this);
		this.addMessageListener(ViewCtrlEvents.OnForeground, this._onForeground);
		this.addMessageListener(ViewCtrlEvents.OnBackground, this._onBackground);
	}

	/**
	 * 封装一个派发全局事件的接口，避免eventMgr过度引用
	 * @param notifyName 事件名称
	 * @param data 参数
	 */
	override dispatch(notifyName: string, data?: any) {
		eventMgr.event(notifyName, data);
	}

	override onReset() {
		const { _view, _listener, _subCtrls, _proxy } = this;
		Laya.timer.clearAll(this);
		Laya.timer.clearAll(_view);
		Laya.Tween.clearAll(this);
		Laya.Tween.clearAll(_view);
		eventMgr.offAllCaller(this);
		eventMgr.offAllCaller(_view);
		eventMgr.offAllCaller(_proxy);
		_listener?.offAll();
		Laya.Pool.recoverByClass(_listener);
		Laya.Pool.recoverByClass(_proxy);
		_subCtrls.length = 0;
		this.data = null;
		this._view = null;
		this._listener = null;
		this._proxy = null;
		ViewCtrlDIExtend.offDeviceEvent(this);
	}

	/**
	 * 添加页面消息监听
	 * @param type 消息类型
	 * @param callback 回调函数
	 * @param args 参数
	 */
	protected addMessageListener(type: string, callback: Function, args?: any[]) {
		this._listener.on(type, this, callback, args);
	}

	/**
	 * 组件被挂载时执行，早于awake，方法只执行一次
	 * 此方法为虚方法，使用时重写覆盖即可
	 */
	protected onAdded(): void { }

	/** 
	 * 每次面板前置调用该方法，onEnable之后调用。
	 * 该方法为虚方法，使用时重写即可
	 */
	protected onForeground(): void { }

	/** 
	 * 每次面板后置调用该方法，onDisable之后调用。
	 * 该方法为虚方法，使用时重写即可
	 */
	protected onBackground(): void { }

	private _onAdded() {
		this._view = this.owner[ "$owner" ];
		this.listener = Laya.Pool.createByClass(Laya.EventDispatcher);
		this._proxy = Laya.Pool.createByClass(ProxyClass[ this.viewId ]);
		this._proxy.viewCtrl = this;
		this.onAdded();
	}

	private _onForeground() {
		this.onForeground();
		this.subCtrls.forEach(v => v._onForeground());
	}

	private _onBackground() {
		this.onBackground();
		this.subCtrls.forEach(v => v._onBackground());
	}
}

/** 按键事件类型 */
export const enum KeyEvent {
	KeyDown = "keydown",
	KeyPress = "keypress",
	KeyUp = "keyup",
}

/** 鼠标事件类型 */
export const enum MouseEvent {
	MouseOver = "mouseover",
	MouseDown = "mousedown",
	MouseMove = "mousemove",
	MouseUp = "mouseup",
	MouseOut = "mouseout",
	DoubleClick = "doubleclick",
	RightClick = "rightclick",
	Click = "click",
	StageMouseDown = "stagemousedown",
	StageMouseMove = "stagemousemove",
	StageMouseUp = "stagemouseup",
	StageClick = "stageclick",
}

/**
 * 页面控制器键盘事件装饰器工厂
 * @param keyEventType 事件类型
 * @param key 触发事件的键值
 * @param once 是否只监听一次
 * @return MethodDecorator
 */
export function InsertKeyEvent(keyEventType: KeyEvent, key: number, once?: boolean) {
	return function (target: DIViewCtrl, propertyKey: string | symbol, descriptor: PropertyDescriptor) {
		if (!target.__keyEventList) target.__keyEventList = {};
		if (!target.__keyEventList[ keyEventType ]) target.__keyEventList[ keyEventType ] = {};
		if (!target.__keyEventList[ keyEventType ][ key ]) target.__keyEventList[ keyEventType ][ key ] = [];

		const func = descriptor.value;
		const list: Function[] = target.__keyEventList[ keyEventType ][ key ];
		if (list.includes(func) == false) {
			list.push(func);
			if (once) {
				func[ key ] = func[ key ] || {};
				func[ key ].__once = true;
			}
		}
	}
}

/**
 * 页面控制器鼠标事件装饰器工厂
 * @param mouseEventType 事件类型
 * @param once 是否只监听一次
 * @return MethodDecorator
 */
export function InsertMouseEvent(mouseEventType: MouseEvent, once?: boolean) {
	return function (target: DIViewCtrl, propertyKey: string | symbol, descriptor: PropertyDescriptor) {
		if (!target.__mouseEventList) target.__mouseEventList = {};
		if (!target.__mouseEventList[ mouseEventType ]) target.__mouseEventList[ mouseEventType ] = [];

		const func = descriptor.value;
		const list: Function[] = target.__mouseEventList[ mouseEventType ];
		if (list.includes(func) == false) {
			list.push(func);
			if (once) {
				func[ mouseEventType ] = func[ mouseEventType ] || {};
				func[ mouseEventType ].__once = true;
			}
		}
	}
}
