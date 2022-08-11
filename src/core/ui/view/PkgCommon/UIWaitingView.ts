import { ExtensionClass } from "../../../libs/utils/Util";
import { ViewExtension } from "../../core/interfaces";
import UIWaiting from "../../ui/PkgCommon/UIWaiting";
import { ResPath } from "../../../common/ResPath";

export const enum UIWaitingMsg {

}

export class UIWaitingView extends ExtensionClass<ViewExtension, UIWaiting>(UIWaiting) {
    static PkgRes = ResPath.Ui_PkgCommon;
    static DontDestroy: boolean = true;

	override onCreate(): void {
        
    }

}
