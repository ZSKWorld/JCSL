import { ResPath } from "../../core/common/ResPath";
import { uiMgr } from "../../core/ui/core/UIManager";
import { ViewID } from "../../core/ui/core/ViewID";
import { LogicSceneBase } from "../LogicSceneBase";

/**
 * @Author       : zsk
 * @Date         : 2022-08-05 21:17:13
 * @LastEditors  : zsk
 * @LastEditTime : 2022-09-20 22:51:42
 * @Description  : 登录逻辑场景
 */
export class LogicSceneLogin extends LogicSceneBase {
	protected override getResArray(): string[] {
		return [ ResPath.Ui_PkgLogin ];
	}

	protected onEnter(): void {
		uiMgr.addView(ViewID.LoginMainView);
	}

	protected onExit(): void {
	}

}