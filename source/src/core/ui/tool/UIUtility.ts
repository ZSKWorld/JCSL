import { NotifyConst } from "../../common/NotifyConst";
import { eventMgr } from "../../libs/event/EventMgr";
import { Layer, layerMgr } from "../core/GameLayer";
import { IView } from "../core/interfaces";
import { uiMgr } from "../core/UIManager";
import { ViewID } from "../core/ViewID";
import { UIPoolKey } from "./UIPoolKey";

/**
 * @Author       : zsk
 * @Date         : 2022-08-05 21:17:13
 * @LastEditors  : zsk
 * @LastEditTime : 2022-09-13 08:18:55
 * @Description  : UI工具类
 */
export class UIUtility {
	/**
	 * 弹浮动提示
	 * @param text 文字
	 * @param color 文字颜色，默认："#ffffff"
	 */
	static ShowTipInfo(text: string, color?: string) {
		const tip = this.getViewFromPool(UIPoolKey.TipInfo, ViewID.ComTipInfoView, Layer.Bottom, { text, color }, false);
		tip.touchable = false;
		eventMgr.event(NotifyConst.AddMainLog, text);
	}

	/**
	 * 弹确认窗口
	 * @param text 内容
	 * @param title 标题，默认："提示"
	 */
	static ShowConfirm(text: string, title?: string, callback?: Laya.Handler) {
		uiMgr.addView(ViewID.TipConfirmView, { text, title, callback }, null, false);
	}

	/**
	 * 设置list
	 * @param list list组件
	 * @param numItems 元素数量
	 * @param caller 调用者
	 * @param renderFunc 渲染回调
	 * @param clickFunc 点击回调
	 */
	static SetList(
		list: fairygui.GList,
		numItems: number,
		caller: any,
		renderFunc: (index?: number, item?: any) => void,
		clickFunc?: (item?: any, evt?: Laya.Event, index?: number) => void,
		virtual: boolean = true,
	): void {
		virtual && list.setVirtual();
		list.itemRenderer?.recover();
		list.itemRenderer = Laya.Handler.create(caller, renderFunc, null, false);
		clickFunc && list.on(fgui.Events.CLICK_ITEM, caller, clickFunc);
		//如果设置setVirtual，numItems必须在itemRenderer之后赋值
		list.numItems = numItems;
	}

	/**
	 * 设置下拉框
	 * @param cmb 下拉框组件
	 * @param items item数组
	 * @param values value数组
	 * @param caller 调用者
	 * @param changedFunc changed回调
	 * @param defaultValue 默认值
	 * @param showItemCount 下拉显示数量
	 */
	static SetCombox(
		cmb: fgui.GComboBox,
		items: string[],
		values: any[],
		caller?: any,
		changedFunc?: (evt?: Laya.Event) => void,
		defaultValue?: any,
		showItemCount?: number
	) {
		cmb.items = items;
		cmb.values = values;
		changedFunc && cmb.on(fgui.Events.STATE_CHANGED, caller, changedFunc);
		const index = values.indexOf(defaultValue);
		cmb.selectedIndex = index == -1 ? 0 : index;
		cmb.visibleItemCount = Math.floor(showItemCount) > 0 ? Math.floor(showItemCount) : items.length;
	}

	/**
	 * 从对象池中获取页面实例，没有则创建，有的话则从对象池中获取
	 * @param key 对象池标识
	 * @param viewID 页面ID
	 * @param layer 层级
	 * @param data 初始数据
	 * @param fullScreen 是否全屏
	 */
	private static getViewFromPool(key: UIPoolKey, viewID: ViewID, layer: Layer, data: any, fullScreen: boolean = true) {
		const viewInst = <IView>Laya.Pool.getItemByCreateFun(
			key, () => uiMgr.createViewInstance(viewID, fullScreen)
		);
		viewInst.initView(viewID, viewInst, null, data);
		layerMgr.addObject(viewInst, layer);
		return viewInst;
	}
}