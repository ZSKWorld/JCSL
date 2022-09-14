import { NotifyConst } from "./core/common/NotifyConst";
import { eventMgr } from "./core/libs/event/EventMgr";
import { MathUtil } from "./core/libs/math/MathUtil";

/**
 * @Author       : zsk
 * @Date         : 2022-08-05 21:17:13
 * @LastEditors  : zsk
 * @LastEditTime : 2022-09-14 20:38:53
 * @Description  : 引擎修复
 */
export class FixEngine {
	static Fix() {
		this.UbbTagI();
		this.GComponentExtension();
		this.AddGUIObjectEventLockable();
		this.LoadPackage();
		this.FixLayaPoolSign();
		this.AddComponentNetConnect();
		this.ClearEventDispatcherHandler();
		this.PlayTransitionAction();
	}

	/**修复GUI粗体不生效 */
	private static UbbTagI() {
		const inst = fairygui.UBBParser.inst as any;
		inst._handlers[ "i" ] = function onTag_I(tagName, end, attr) {
			return end ? ("</span>") : ("<span style='italic:true'>");
		}
		inst._handlers[ "u" ] = function onTag_U(tagName, end, attr) {
			if (!end) return "<a href=\" \">";
			else return "</a>";
		}
	}

	private static GComponentExtension() {
		const prototype = fgui.GComponent.prototype;
		prototype.addComponentIntance = function (component) {
			return this._displayObject.addComponentIntance(component);
		}
		prototype.addComponent = function (componentType) {
			return this._displayObject.addComponent(componentType);
		}
		prototype.getComponent = function (componentType) {
			return this._displayObject.getComponent(componentType);
		}
		prototype.getComponents = function (componentType) {
			return this._displayObject.getComponents(componentType);
		}
	}

	/**添加ui节点事件锁 */
	private static AddGUIObjectEventLockable() {
		const touchMgrPrototype = Laya.TouchManager.prototype;
		const lockChildMap: Map<number, boolean> = new Map();
		//拦截触摸事件派发，处理事件锁
		touchMgrPrototype[ "sendEvents" ] = function (eles: (Laya.Sprite & { __eventLockMap: any })[], type) {
			let i, len, tE, eventLockMap, lockChild
			len = eles.length;
			this._event._stoped = false;
			let _target
			_target = eles[ 0 ];
			lockChildMap.clear();
			for (i = len - 1; i >= 0; i--) {
				tE = eles[ i ];
				if (tE.destroyed) break;
				eventLockMap = tE.__eventLockMap;
				if (eventLockMap) {
					if (eventLockMap[ "$LockAll" ]) lockChild = !!eventLockMap[ "$LockAll_LockChild" ];
					else if (eventLockMap[ type ]) lockChild = !!eventLockMap[ type + "_LockChild" ];
					else continue;
					if (lockChild) {
						i++;
						break;
					} else lockChildMap.set(i, true);
				}
			}
			i < 0 && (i = 0);
			for (; i < len; i++) {
				tE = eles[ i ];
				if (tE.destroyed)
					return;
				if (!lockChildMap.get(i))
					tE.event(type, this._event.setTo(type, tE, _target));
				if (this._event._stoped)
					break;
			}
		}

		const eventDispatchProto = Laya.EventDispatcher.prototype;
		const oldEvent = eventDispatchProto.event;
		//拦截事件，处理事件锁
		eventDispatchProto.event = function (type: string, data?: any): boolean {
			const eventLockMap = this.__eventLockMap;
			if (eventLockMap && (eventLockMap[ "$LockAll" ] || eventLockMap[ type ]))
				return;
			return oldEvent.call(this, type, data);
		}

		const gobjProto = fgui.GObject.prototype;
		gobjProto.addEventLock = function (type?: string, lockChild?: boolean) {
			if (this.isDisposed || type == "") return;
			const eventLockMap = this.displayObject.__eventLockMap || (this.displayObject.__eventLockMap = {});
			type = type == void 0 ? "$LockAll" : type;
			eventLockMap[ type ] = true;
			eventLockMap[ type + "_LockChild" ] = lockChild == void 0 ? true : lockChild;
		}
		gobjProto.hasEventLock = function (type?: string) {
			if (this.isDisposed || type == "") return false;
			const eventLockMap = this.displayObject.__eventLockMap;
			if (eventLockMap) {
				if (type == void 0) return !!eventLockMap[ "$LockAll" ];
				else return !!eventLockMap[ type ];
			} else return false;
		}
		gobjProto.removeEventLock = function (type?: string) {
			if (this.isDisposed || type == "") return;
			const eventLockMap = this.displayObject.__eventLockMap;
			if (eventLockMap) {
				if (type == void 0) eventLockMap[ "$LockAll" ] = false;
				else if (eventLockMap[ type ]) eventLockMap[ type ] = false;
			}
		}
		gobjProto.removeAllEventLock = function () {
			if (this.isDisposed) return;
			this.displayObject.__eventLockMap = null;
		}
	}

	/** 修复loadPackage重复加载的bug */
	private static LoadPackage() {
		fgui.UIPackage.loadPackage = function loadPackage(resKey, completeHandler, progressHandler) {
			const UIPackage = fgui.UIPackage as any;
			let loadKeyArr = [];
			let keys = [];
			let i;
			if (Array.isArray(resKey)) {
				for (i = 0; i < resKey.length; i++) {
					loadKeyArr.push({ url: resKey[ i ] + "." + fgui.UIConfig.packageFileExtension, type: Laya.Loader.BUFFER });
					keys.push(resKey[ i ]);
				}
			}
			else {
				loadKeyArr = [ { url: resKey + "." + fgui.UIConfig.packageFileExtension, type: Laya.Loader.BUFFER } ];
				keys = [ resKey ];
			}
			let pkgArr = [];
			let pkg;
			for (i = 0; i < loadKeyArr.length; i++) {
				pkg = UIPackage._instById[ keys[ i ] ];
				if (pkg) {
					pkgArr.push(pkg);
					loadKeyArr.splice(i, 1);
					keys.splice(i, 1);
					i--;
				}
			}
			if (loadKeyArr.length == 0) {
				completeHandler.runWith([ pkgArr ]);
				return;
			}
			var descCompleteHandler = Laya.Handler.create(this, function () {
				let pkg;
				let urls = [];
				for (i = 0; i < loadKeyArr.length; i++) {
					let asset = fgui.AssetProxy.inst.getRes(loadKeyArr[ i ].url);
					if (asset) {
						pkg = new UIPackage();
						pkgArr.push(pkg);
						pkg._resKey = keys[ i ];
						pkg.loadPackage(new fgui.ByteBuffer(asset));
						let cnt = pkg._items.length;
						for (let j = 0; j < cnt; j++) {
							let pi = pkg._items[ j ];
							if (pi.type == fgui.PackageItemType.Atlas) {
								urls.push({ url: pi.file, type: Laya.Loader.IMAGE });
							}
							else if (pi.type == fgui.PackageItemType.Sound) {
								urls.push({ url: pi.file, type: Laya.Loader.SOUND });
							}
						}
					}
				}
				if (urls.length > 0) {
					fgui.AssetProxy.inst.load(urls, Laya.Handler.create(this, function () {
						for (i = 0; i < pkgArr.length; i++) {
							pkg = pkgArr[ i ];
							if (!UIPackage._instById[ pkg.id ]) {
								UIPackage._instById[ pkg.id ] = pkg;
								UIPackage._instByName[ pkg.name ] = pkg;
								// UIPackage._instByName[pkg._resKey] = pkg;
								UIPackage._instById[ pkg._resKey ] = pkg;
							}
						}
						completeHandler.runWith([ pkgArr ]);
					}, null, true), progressHandler);
				}
				else {
					for (i = 0; i < pkgArr.length; i++) {
						pkg = pkgArr[ i ];
						if (!UIPackage._instById[ pkg.id ]) {
							UIPackage._instById[ pkg.id ] = pkg;
							UIPackage._instByName[ pkg.name ] = pkg;
							// UIPackage._instByName[pkg._resKey] = pkg;
							UIPackage._instById[ pkg._resKey ] = pkg;
						}
					}
					completeHandler.runWith([ pkgArr ]);
				}
			}, null, true);
			fgui.AssetProxy.inst.load(loadKeyArr, descCompleteHandler, null, Laya.Loader.BUFFER);
		}
	}

	/** 修复Laya.Pool._getClassSign方法，原方法会导致子类和父类回收到一个对象池中 */
	private static FixLayaPoolSign() {
		const pool = Laya.Pool;
		pool[ "_getClassSign" ] = function (cla: any) {
			var className = cla[ "__className" ] || (Object.prototype.hasOwnProperty.call(cla, "_$gid") ? cla[ "_$gid" ] : null);
			if (!className) {
				cla[ "_$gid" ] = className = Laya.Pool[ "_CLSID" ] + "";
				Laya.Pool[ "_CLSID" ]++;
			}
			return className;
		}
	}

	/** 添加fgui组件网络关联，网络断开连接后都不能点击*/
	private static AddComponentNetConnect() {
		const prototype = fgui.GComponent.prototype;
		const constructFromResource = prototype[ "constructFromResource" ];
		prototype[ "constructFromResource" ] = function () {
			constructFromResource.call(this);
			this.on(Laya.Event.DISPLAY, this, this.$onDisplay);
			this.on(Laya.Event.UNDISPLAY, this, this.$onUndisplay);
		};
		prototype[ "$onDisplay" ] = function () {
			eventMgr.on(NotifyConst.SocketOpened, this, this.$onNetChanged, [ true ]);
			eventMgr.on(NotifyConst.SocketClosed, this, this.$onNetChanged, [ false ]);
		};
		prototype[ "$onUndisplay" ] = function () {
			eventMgr.off(NotifyConst.SocketOpened, this, this.$onNetChanged);
			eventMgr.off(NotifyConst.SocketClosed, this, this.$onNetChanged);
			this.$onNetChanged(true);
		};
		prototype[ "$onNetChanged" ] = function (value: boolean) {
			if (value) {
				if (this.oldClickLock !== void 0) {
					!this.oldClickLock && this.removeEventLock(Laya.Event.CLICK);
					this.oldClickLock = void 0;
				}
			} else {
				if (this.oldClickLock === void 0) {
					this.oldClickLock = this.hasEventLock(Laya.Event.CLICK);
					this.addEventLock(Laya.Event.CLICK);
				}
			}
		}
	}

	/** 定量清理注册事件数组中空元素 */
	private static ClearEventDispatcherHandler() {
		const prototype = Laya.EventDispatcher.prototype;
		prototype.off = function (type: string, caller: any, listener: Function, onceOnly?: boolean) {
			if (!this._events || !this._events[ type ])
				return this;
			var listeners = this._events[ type ];
			if (listeners != null) {
				if (listeners.run) {
					if ((!caller || listeners.caller === caller) && (listener == null || listeners.method === listener) && (!onceOnly || listeners.once)) {
						delete this._events[ type ];
						listeners.recover();
					}
				}
				else {
					var count = 0;
					for (var i = 0, n = listeners.length; i < n; i++) {
						var item = listeners[ i ];
						if (!item) {
							count++;
							continue;
						}
						if (item && (!caller || item.caller === caller) && (listener == null || item.method === listener) && (!onceOnly || item.once)) {
							count++;
							listeners[ i ] = null;
							item.recover();
						}
					}
					if (count === n)
						delete this._events[ type ];
					else if (count > 5000) {
						const temp = [];
						for (var i = 0, n = listeners.length; i < n; i++) {
							var item = listeners[ i ];
							if (item) temp.push(item);
						}
						listeners.length = 0;
						this._events[ type ] = temp;
					}
				}
			}
			return this;
		}
	}

	/** 修改控制器动效播放机制为每次都从头播放 */
	private static PlayTransitionAction() {
		const prototype = fgui.PlayTransitionAction.prototype;
		prototype[ "enter" ] = function (controller: fgui.Controller) {
			if (!this._currentTransition) {
				this._currentTransition = controller.parent.getTransition(this.transitionName);
			}
			this._currentTransition.play(null, this.playTimes, this.delay);
		}
	}
}

/** 没有引入laya.d3.js，手动添加Laya.Vector2 */
Laya.Vector2 = class Vector2 {
	static readonly ZERO = new Vector2();
	static readonly ONE = new Vector2(1, 1);
	constructor(
		public x = 0,
		public y = 0,
	) { }

	static dot(a: Vector2, b: Vector2) { return (a.x * b.x) + (a.y * b.y); }

	static scale(a: Vector2, b: number, out: Vector2) { out.setValue(a.x * b, a.y * b); }

	static normalize(s: Vector2, out: Vector2) {
		let x = s.x, y = s.y;
		let len = x * x + y * y;
		if (len > 0) {
			len = 1 / Math.sqrt(len);
			out.x = x * len;
			out.y = y * len;
		}
	}

	static scalarLength(a: Vector2) {
		let x = a.x, y = a.y;
		return Math.sqrt(x * x + y * y);
	}

	static rewriteNumProperty(proto: any, name: string, index: number) { }

	fromArray(array, offset = 0) {
		this.x = array[ offset + 0 ];
		this.y = array[ offset + 1 ];
	}

	toArray(array, offset = 0) {
		array[ offset + 0 ] = this.x;
		array[ offset + 1 ] = this.y;
	}

	cloneTo(destObject) {
		var destVector2 = destObject;
		destVector2.x = this.x;
		destVector2.y = this.y;
	}

	forNativeElement(nativeElements = null) { }

	get length() { return Math.sqrt(this.lengthSquared); }
	get lengthSquared() {
		const { x, y } = this;
		return x * x + y * y;
	}

	setValue(x: number, y: number) {
		this.x = x;
		this.y = y;
		return this;
	}

	add(v2: Vector2): Vector2;
	add(x: number, y?: number): Vector2;
	add(v1: Vector2 | number, v2 = 0) {
		if (typeof v1 == "number") return this.setValue(this.x + v1, this.y + v2);
		return this.setValue(this.x + v1.x, this.y + v1.y);
	}

	sub(v2: Vector2) { return this.setValue(this.x - v2.x, this.y - v2.y); }

	scale(scale: number) { return this.setValue(this.x * scale, this.y * scale); }

	dot(v2: Vector2) { return this.x * v2.x + this.y * v2.y; }

	normalize() {
		const { x, y } = this;
		let len = x * x + y * y;
		if (len > 0) {
			len = 1 / Math.sqrt(len);
			this.setValue(x * len, y * len);
		}
		return this;
	}

	rotate(angle: number) {
		const radian = MathUtil.AngleToRadian(angle);
		const cos = Math.cos(radian);
		const sin = Math.sin(radian);
		const { x, y } = this;
		return this.setValue(x * cos + y * sin, -x * sin + y * cos);
	}

	copyTo(v2: Vector2) { return v2.setValue(this.x, this.y); }

	clone() { return new Vector2(this.x, this.y); }
}