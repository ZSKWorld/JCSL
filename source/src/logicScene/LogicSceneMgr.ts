import { NotifyConst } from "../core/common/NotifyConst";
import { InsertNotify } from "../core/libs/event/EventMgr";
import { Observer } from "../core/libs/event/Observer";
import { Logger } from "../core/libs/utils/Logger";
import { IScene } from "./ILogicScene";
import { LogicSceneType } from "./LogicSceneType";

const logger = Logger.Create("LogicSceneMgr").setEnable(true);

/**
 * @Author       : zsk
 * @Date         : 2022-08-05 21:17:13
 * @LastEditors  : zsk
 * @LastEditTime : 2022-09-15 23:56:34
 * @Description  : 逻辑场景管理类
 */
class LogicSceneMgr extends Observer {
	private _currentType: LogicSceneType;
	private _currentScene: IScene;
	private _enterCompleted: boolean = true;
	private _sceneMap: Map<LogicSceneType, IScene>;

	init(sceneMap: [ LogicSceneType, IScene ][]) {
		if (!this._sceneMap)
			this._sceneMap = new Map(sceneMap);
	}

	@InsertNotify(NotifyConst.EnterScene)
	private enterScene(type: LogicSceneType, data?: any) {
		if (!this._enterCompleted) return;
		if (this._currentType != type) {
			this._enterCompleted = false;
			const newScene = this._sceneMap.get(type);
			newScene.load().then(() => {
				this._currentType = type;
				if (this._currentScene)
					this._currentScene.exit();
				this._currentScene = newScene;
				this._enterCompleted = true;
				this._currentScene.enter(data);
				Laya.Resource.destroyUnusedResources();
			}, () => {
				//场景加载失败
				this._enterCompleted = true;
				if (confirm(`场景 ${ type } 加载失败，是否重试?`))
					this.enterScene(type, data);
			});
		}
	}
}

export const logicSceneMgr = new LogicSceneMgr()
windowImmit("logicSceneMgr", logicSceneMgr);