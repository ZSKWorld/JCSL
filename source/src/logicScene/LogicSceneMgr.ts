import { NotifyConst } from '../core/common/NotifyConst'
import { InsertNotify } from '../core/libs/event/EventMgr'
import { Observer } from '../core/libs/event/Observer'
import { Logger } from '../core/libs/utils/Logger'
import { IScene } from './ILogicScene'
import { LogicSceneType } from './LogicSceneType'

const logger = Logger.Create("LogicSceneMgr").setEnable(true);

/**
 * @Author       : zsk
 * @Date         : 2022-08-05 21:17:13
 * @LastEditors  : zsk
 * @LastEditTime : 2022-08-29 01:36:00
 * @Description  : 逻辑场景管理类
 */
class LogicSceneMgr extends Observer {
	private currentType: LogicSceneType;
	private currentScene: IScene;
	private enterCompleted: boolean = true;
	private sceneMap: Map<LogicSceneType, IScene>;

	init(sceneMap: [ LogicSceneType, IScene ][]) {
		if (!this.sceneMap)
			this.sceneMap = new Map(sceneMap);
	}

	@InsertNotify(NotifyConst.EnterScene)
	enterScene(type: LogicSceneType, data?: any) {
		if (!this.enterCompleted) return;
		if (this.currentType != type) {
			this.enterCompleted = false;
			const newScene = this.sceneMap.get(type);
			newScene.load().then(() => {
				this.currentType = type;
				if (this.currentScene)
					this.currentScene.exit();
				this.currentScene = newScene;
				this.enterCompleted = true;
				this.currentScene.enter(data);
				Laya.Resource.destroyUnusedResources();
			}, () => {
				//场景加载失败
				this.enterCompleted = true;
			});
		}
	}
}

export const logicSceneMgr = new LogicSceneMgr()
windowImmit("logicSceneMgr", logicSceneMgr);