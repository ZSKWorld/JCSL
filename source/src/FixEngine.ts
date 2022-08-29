/**
 * @Author       : zsk
 * @Date         : 2022-08-05 21:17:13
 * @LastEditors  : zsk
 * @LastEditTime : 2022-08-29 21:54:29
 * @Description  : 引擎修复
 */
export class FixEngine {
	static Fix() {
		this.UbbTagI();
		this.AddGUIObjectEventLockable();
		this.LoadPackage();
		this.addScriptStageMouseOut();
		this.fixLayaPoolSign();
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
			type = type == null ? "$LockAll" : type;
			eventLockMap[ type ] = true;
			eventLockMap[ type + "_LockChild" ] = lockChild == null ? true : lockChild;
		}
		gobjProto.removeEventLock = function (type?: string) {
			if (this.isDisposed || type == "") return;
			const eventLockMap = this.displayObject.__eventLockMap;
			if (eventLockMap) {
				if (type == null) eventLockMap[ "$LockAll" ] = false;
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

	/** 添加Laya.Script onStageMouseOut虚函数 */
	private static addScriptStageMouseOut() {
		const prototype = Laya.Script.prototype;
		const old: Function = prototype[ "_onEnable" ];
		prototype[ "_onEnable" ] = function () {
			if (this.onStageMouseOut && typeof this.onStageMouseOut == "function") {
				Laya.stage.on(Laya.Event.MOUSE_OUT, this, this.onStageMouseOut);
			}
			old.call(this);
		}
	}

	/** 修复Laya.Pool._getClassSign方法，原方法会导致子类和父类回收到一个对象池中 */
	private static fixLayaPoolSign() {
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
}