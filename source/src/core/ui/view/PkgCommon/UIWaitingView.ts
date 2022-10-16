import { ResPath } from "../../../common/ResPath";
import { ExtensionClass } from "../../../libs/utils/Util";
import { ViewExtension } from "../../core/Interfaces";
import UIWaiting from "../../ui/PkgCommon/UIWaiting";

export const enum UIWaitingMsg {

}

export class UIWaitingView extends ExtensionClass<ViewExtension, UIWaiting>(UIWaiting) {
    static PkgRes = ResPath.Ui_PkgCommon;
    static DontDestroy = true;

    override onCreate(): void {

    }

    refreshText(text: string) {
        this.TxtInfo.text = text;
    }

}
