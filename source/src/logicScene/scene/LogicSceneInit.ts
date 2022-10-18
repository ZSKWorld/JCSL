import { NotifyConst } from "../../core/common/NotifyConst";
import { ResPath } from "../../core/common/ResPath";
import { CustomSpriteManager } from "../../core/libs/customSprite/CustomSpriteManager";
import { websocket } from "../../core/net/WebSocket";
import { tableMgr } from "../../core/table/TableManager";
import { layerMgr } from "../../core/ui/core/GameLayer";
import { uiMgr } from "../../core/ui/core/UIManager";
import { ViewExtend } from "../../core/ui/core/ViewExtend";
import { uiRegister } from "../../core/ui/core/ViewRegister";
import { LogicSceneBase } from "../LogicSceneBase";
import { LogicSceneType } from "../LogicSceneType";

/** 初始化逻辑场景 */
export class LogicSceneInit extends LogicSceneBase {

	protected override getConstResArray(): string[] {
		return [
			ResPath.TablePath.Config,
			ResPath.FontPath.Font03,
			ResPath.UIPath.PkgCommon,
		];
	}

	protected onEnter(): void {
		ViewExtend.init();
		tableMgr.loadTable();
		uiRegister.Init();
		layerMgr.init();
		uiMgr.init();
		websocket.init();
		CustomSpriteManager.init();
		this.dispatch(NotifyConst.EnterScene, LogicSceneType.LoginScene);
	}

	protected onExit(): void {
	}

}