import { NotifyConst } from "../../core/common/NotifyConst";
import { ResPath } from "../../core/common/ResPath";
import { websocket } from "../../core/net/WebSocket";
import { tableMgr } from "../../core/table/TableManager";
import { layerMgr } from "../../core/ui/core/GameLayer";
import { uiMgr } from "../../core/ui/core/UIManager";
import { ViewExtend } from "../../core/ui/core/ViewExtend";
import { uiRegister } from "../../core/ui/core/ViewRegister";
import { LogicSceneBase } from "../LogicSceneBase";
import { LogicSceneType } from "../LogicSceneType";

/**
 * @Author       : zsk
 * @Date         : 2022-08-05 21:17:13
 * @LastEditors  : zsk
 * @LastEditTime : 2022-08-29 21:27:52
 * @Description  : 初始化逻辑场景
 */
export class LogicSceneInit extends LogicSceneBase {

	protected override getConstResArray(): string[] {
		return [
			ResPath.Table_Config,
			ResPath.Font_Font01,
			ResPath.Font_Font02,
			ResPath.Font_Font03,
			ResPath.Font_Font04,
			ResPath.Font_Font05,
			ResPath.Font_Font06,
			ResPath.Font_Font07,
			ResPath.Font_Font08,
			ResPath.Font_Font09,
			ResPath.Font_Font10,
			ResPath.Font_Font11,
			ResPath.Font_Font12,
			ResPath.Font_Font13,
			ResPath.Font_Font14,
			ResPath.Ui_PkgCommon,
		];
	}

	protected onEnter(): void {
		ViewExtend.init();
		tableMgr.loadTable();
		uiRegister.Init();
		layerMgr.init();
		uiMgr.init();
		websocket.init();
		this.dispatch(NotifyConst.EnterScene, LogicSceneType.LoginScene);
	}

	protected onExit(): void {
	}

}