import { NotifyConst } from "../../core/common/NotifyConst";
import { ResPath } from "../../core/common/ResPath";
import { ViewID } from "../../core/ui/core/ViewID";
import { LogicSceneBase } from "../LogicSceneBase";

/**
 * @Author       : zsk
 * @Date         : 2022-08-05 21:17:13
 * @LastEditors  : zsk
 * @LastEditTime : 2022-08-29 21:28:43
 * @Description  : 登录逻辑场景
 */
export class LogicSceneLogin extends LogicSceneBase {
	protected override getResArray(): string[] {
		return [ ResPath.Ui_PkgLogin ];
	}

	protected onEnter(): void {
		this.dispatch(NotifyConst.AddView, ViewID.LoginMainView);
	}

	protected onExit(): void {
	}

}