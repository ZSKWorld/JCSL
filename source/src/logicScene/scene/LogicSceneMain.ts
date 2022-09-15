import { NotifyConst } from "../../core/common/NotifyConst";
import { ResPath } from "../../core/common/ResPath";
import { uiMgr } from "../../core/ui/core/UIManager";
import { ViewID } from "../../core/ui/core/ViewID";
import { LogicSceneBase } from "../LogicSceneBase";

/**
 * @Author       : zsk
 * @Date         : 2022-08-05 21:17:13
 * @LastEditors  : zsk
 * @LastEditTime : 2022-09-15 23:53:40
 * @Description  : 主页逻辑场景
 */
export class LogicSceneMain extends LogicSceneBase {
	protected override getResArray(): string[] {
		return [
			ResPath.Ui_PkgMain
		];
	}

	protected onEnter(): void {
		uiMgr.addView(ViewID.MainView);
	}

	protected onExit(): void {
	}
}