import { eventMgr } from "../../libs/event/EventMgr";
import { userData } from "../../userData/UserData";
import { BaseViewCtrl } from "./BaseViewCtrl";
import { IView, IViewCtrl } from "./interfaces";
import { CtrlClass, ProxyClass } from "./UIGlobal";
import { uiMgr } from "./UIManager";
import { ViewID } from "./ViewID";

/** 页面方法扩展 */
export class ViewExtend {
	static init() {
		this.fguiGComponentExtend();
		this.baseCtrlExtend();
	}

	private static fguiGComponentExtend() {
		let prototype = fgui.GComponent.prototype as IView;
		prototype.sendMessage = function (type, data) { (<IView>this).listener?.event(type, data); };
		prototype.dispatch = function (type, data) { eventMgr.event(type, data); };
		prototype.addView = function (viewId, data, callback, hideTop) { uiMgr.addView(viewId, data, callback, hideTop); };
		prototype.removeTop = function () { uiMgr.removeTop(); };
		prototype.removeAll = function () { uiMgr.removeAllView(); };
		prototype.removeView = function (viewId) { uiMgr.removeView(viewId); };
		prototype.removeSelf = function () { uiMgr.removeView((<IView>this).name as ViewID); };
		prototype.initView = function (viewId, viewInst, listener, data) {
			//是否是新挂载组件，只有新挂载的组件才执行onCreate方法
			let newComp = true;
			let CtrlCls = CtrlClass[ viewId ];
			let viewCtrl: IViewCtrl;
			if (CtrlCls) {
				viewCtrl = viewInst.getComponent(CtrlCls);
				if (viewCtrl) newComp = false;
				else viewCtrl = viewInst.addComponent(CtrlCls);
			}
			if (viewCtrl) {
				data != undefined && (viewCtrl.data = data);
				viewCtrl.listener = listener;
				viewCtrl.userData = userData;
				if (!viewCtrl.proxy && ProxyClass[ viewId ])
					viewCtrl.proxy = new ProxyClass[ viewId ]();
				viewCtrl.proxy && (viewCtrl.proxy.viewCtrl = viewCtrl);
			}
			viewInst.userData = userData;
			//这里不能使用传入的listener
			viewInst.listener = viewCtrl?.listener;
			newComp && viewInst.onCreate?.();
			return viewCtrl;
		};
	}

	private static baseCtrlExtend() {
		let prototype = BaseViewCtrl.prototype as IViewCtrl;
		prototype.addView = function (viewId, data, callback, hideTop) { uiMgr.addView(viewId, data, callback, hideTop); };
		prototype.removeTop = function () { uiMgr.removeTop(); };
		prototype.removeAll = function () { uiMgr.removeAllView(); };
		prototype.removeView = function (viewId) { uiMgr.removeView(viewId); };
		prototype.removeSelf = function () { uiMgr.removeView((<IViewCtrl>this).view.name as ViewID); };
	}
}