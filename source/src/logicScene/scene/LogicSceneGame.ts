import { ResPath } from "../../core/common/ResPath";
import { gameMgr } from "../../core/game/GameMgr";
import { uiMgr } from "../../core/ui/core/UIManager";
import { ViewID } from "../../core/ui/core/ViewID";
import { LogicSceneBase } from "../LogicSceneBase";

/**
 * @Author       : zsk
 * @Date         : 2022-08-05 21:17:13
 * @LastEditors  : zsk
 * @LastEditTime : 2022-09-15 23:53:17
 * @Description  : 游戏逻辑场景
 */
export class LogicSceneGame extends LogicSceneBase {

	protected override getResArray(): string[] {
		return [
			ResPath.Ui_PkgGame
		];
	}

	protected onEnter(): void {
		uiMgr.addView(ViewID.GameMainView);
		gameMgr.start();
	}

	protected onExit(): void {
		gameMgr.exit();
	}

}