import { ExtensionClass } from "../../../libs/utils/Util";
import { ViewExtension } from "../../core/Interfaces";
import UIGameMain from "../../ui/PkgGame/UIGameMain";
import { ResPath } from "../../../common/ResPath";

export const enum UIGameMainMsg {
	OnBtnSettingClick = "UIGameMain_OnBtnSettingClick",
}

export class UIGameMainView extends ExtensionClass<ViewExtension, UIGameMain>(UIGameMain) {
    static readonly PkgRes = ResPath.UIPath.PkgGame;

	override onCreate(): void {
        const { BtnSetting } = this;
	    BtnSetting.onClick(this, this.sendMessage, [ UIGameMainMsg.OnBtnSettingClick ]);
    }

}
