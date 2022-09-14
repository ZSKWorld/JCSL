import { ResPath } from "../../../common/ResPath";
import { ExtensionClass } from "../../../libs/utils/Util";
import { ViewExtension } from "../../core/Interfaces";
import UIGameMain from "../../ui/PkgGame/UIGameMain";

export const enum UIGameMainMsg {
    OnBtnSettingClick = "UIGameMain_OnBtnSettingClick",
}

export class UIGameMainView extends ExtensionClass<ViewExtension, UIGameMain>(UIGameMain) {
    static PkgRes = ResPath.Ui_PkgGame;

    override onCreate(): void {
        const { BtnSetting } = this;
        BtnSetting.onClick(this, this.sendMessage, [ UIGameMainMsg.OnBtnSettingClick ]);
    }

}
