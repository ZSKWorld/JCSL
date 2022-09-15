import { NotifyConst } from "../../common/NotifyConst";
import { InsertNotify } from "../../libs/event/EventMgr";
import { Observer } from "../../libs/event/Observer";
import { Logger } from "../../libs/utils/Logger";
import { Layer, layerMgr } from "./GameLayer";
import { IView, ViewCtrlEvents } from "./Interfaces";
import { ViewClass } from "./UIGlobal";
import { ViewID } from "./ViewID";

const logger = Logger.Create("UIManager").setEnable(true);

/** 页面缓存管理 */
class UICache {
	/**销毁缓存时间，毫秒 */
	private static readonly DestroyCacheTime = 1 * 60 * 1000;

	/**销毁缓存，销毁前保留一段时间，期间不在使用就销毁 */
	private _destroyCache: Map<ViewID, [ IView, number ]> = new Map();

	/**不会销毁的页面缓存 */
	private _dontDestroyCache: Map<ViewID, IView> = new Map();

	constructor() { Laya.timer.loop(UICache.DestroyCacheTime, this, this.checkDestroyCache); }


	/** 添加待销毁页面 */
	addDestroyCache(viewId: ViewID, viewInst: IView) {
		if (ViewClass[ viewId ].DontDestroy) this._dontDestroyCache.set(viewId, viewInst);
		else this._destroyCache.set(viewId, [ viewInst, Date.now() ]);
	}

	/** 从缓存中获取页面 */
	getViewFromCache(viewId: ViewID) {
		let viewInst: IView;
		if (ViewClass[ viewId ].DontDestroy) {
			if (this._dontDestroyCache.has(viewId)) {
				viewInst = this._dontDestroyCache.get(viewId);
				this._dontDestroyCache.delete(viewId);
			}
		}
		else if (this._destroyCache.has(viewId)) {
			viewInst = this._destroyCache.get(viewId)[ 0 ];
			this._destroyCache.delete(viewId);
		}
		return viewInst;
	}

	/** 检测销毁页面 */
	private checkDestroyCache() {
		if (this._destroyCache.size > 0) {
			for (const iterator of this._destroyCache) {
				const [ viewID, [ view, startTime ] ] = iterator;
				if ((Date.now() - startTime) >= UICache.DestroyCacheTime) {
					// logger.warn("dispose view", view.viewId);
					view.dispose();
					this._destroyCache.delete(viewID);
				}
			}
		}
	}

}

/**
 * @Author       : zsk
 * @Date         : 2022-04-18 22:11:15
 * @LastEditors  : zsk
 * @LastEditTime : 2022-08-29 00:59:45
 * @Description  : UI管理类
 */
class UIManager extends Observer {
	/**待销毁缓存 */
	private _cache: UICache;
	/** 锁屏面板 */
	private _lockPanel: fgui.GGraph;
	/** 已打开页面 */
	private _openedViews: IView[] = [];


	/** 当前显示的顶层页面 */
	private get topView() { return this._openedViews[ 0 ]; }

	init() {
		this._cache = new UICache();

		this._lockPanel = new fgui.GGraph();
		this._lockPanel.makeFullScreen();
		this._lockPanel.drawRect(0, "", "#00000000");
		layerMgr.addObject(this._lockPanel, Layer.Lock);

		//延迟250防止频繁触发
		Laya.stage.on(Laya.Event.RESIZE, this, () => Laya.timer.once(250, this, this.onResize));
	}

	/** 创建页面实例
	 * @param viewId 页面ID
	 * @param fullScreen 是否全屏
	 * @param init 是否初始化页面
	 * @param data 页面数据
	 * @return 页面实例
	 */
	createViewInstance(viewId: ViewID, fullScreen: boolean = true): IView {
		const viewInst = ViewClass[ viewId ].createInstance();
		viewInst.name = viewId;
		fullScreen && viewInst.makeFullScreen();
		return viewInst;
	}

	/** 添加页面
	 * @param viewId 页面ID
	 * @param data 页面数据
	 * @param callback 回调
	 * @param hideTop 是否隐藏顶部页面
	 */
	@InsertNotify(NotifyConst.AddView)
	addView<T = any>(viewId: ViewID, data?: T, callback?: Laya.Handler, hideTop: boolean = true) {
		let viewInst: IView;
		this._lockPanel.visible = true;
		let openedIndex = this.getOpenViewIndex(viewId);
		if (openedIndex == -1) {
			//先尝试从待销毁缓存池中获取
			viewInst = this._cache.getViewFromCache(viewId);
			if (viewInst) this.addView2(viewId, viewInst, data, hideTop, callback);
			else {
				fgui.UIPackage.loadPackage([ ViewClass[ viewId ].PkgRes ], Laya.Handler.create(this, (res: any[]) => {
					if (!res || !res.length) {
						if (confirm(`界面 ${ viewId } 加载失败，是否重试?`))
							this.addView(viewId, data, callback, hideTop);
					} else {
						viewInst = this.createViewInstance(viewId);
						this.addView2(viewId, viewInst, data, hideTop, callback);
					}
				}));
			}
		} else {
			viewInst = this._openedViews[ openedIndex ];
			if (openedIndex == 0) logger.warn(`Error:${ viewId }已经被打开`);
			else this._openedViews.splice(openedIndex, 1);
			this.addView2(viewId, viewInst, data, hideTop, callback);
		}
	}

	/** 移除顶层页面 */
	removeTopView() {
		if (this.topView) {
			this.removeView(this.topView.viewId);
		}
	}

	/** 移除页面
	 * @param viewId 页面ID，为null则移除全部页面
	 */
	@InsertNotify(NotifyConst.RemoveView)
	removeView(viewId: ViewID) {
		const { _openedViews } = this;
		for (let i = _openedViews.length - 1; i >= 0; i--) {
			const viewInst = _openedViews[ i ];
			if (viewId == null || viewInst.viewId == viewId) {
				_openedViews.splice(i, 1);
				viewInst.removeFromParent();
				viewInst.sendMessage(ViewCtrlEvents.OnBackground);
				this._cache.addDestroyCache(viewInst.viewId, viewInst);
				break;
			}
		}
		const topView = this.topView;
		if (topView) {
			!topView.parent && layerMgr.addObject(topView, topView.layer || Layer.Bottom);
			topView.sendMessage(ViewCtrlEvents.OnForeground);
		}
	}

	/** 移除所有页面 */
	removeAllView() { this.removeView(null); }

	private onResize() {
		const { _openedViews, _lockPanel } = this;
		_lockPanel.makeFullScreen();
		for (let i = _openedViews.length - 1; i >= 0; i--) {
			_openedViews[ i ] && _openedViews[ i ].makeFullScreen();
		}
	}

	/** 获取已打开的页面索引
	 * @param viewId 页面ID
	 * @return 页面索引
	 */
	private getOpenViewIndex(viewId: ViewID) {
		const { _openedViews } = this;
		for (let i = 0, n = _openedViews.length; i < n; i++) {
			const view = _openedViews[ i ];
			if (view.viewId == viewId) return i;
		}
		return -1;
	}

	private addView2(viewID: ViewID, viewInst: IView, data: any, hideTop: boolean, callback: Laya.Handler) {
		viewInst.initView(viewID, viewInst, null, data);
		const topView = this.topView;
		if (viewInst != topView) {
			this._openedViews.unshift(viewInst);
			hideTop && topView?.removeFromParent();
			topView?.sendMessage(ViewCtrlEvents.OnBackground);
			layerMgr.addObject(viewInst, viewInst.layer || Layer.Bottom);
		}
		viewInst.sendMessage(ViewCtrlEvents.OnForeground);
		callback && callback.run();
		this._lockPanel.visible = false;
	}
}

export const uiMgr = new UIManager();
windowImmit("uiMgr", uiMgr)
