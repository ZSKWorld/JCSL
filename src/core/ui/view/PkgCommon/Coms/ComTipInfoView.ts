import { ExtensionClass } from "../../../../libs/utils/Util";
import { ViewExtension } from "../../../core/interfaces";
import ComTipInfo from "../../../ui/PkgCommon/ComTipInfo";
import { ResPath } from "../../../../common/ResPath";

export const enum ComTipInfoMsg {

}

export class ComTipInfoView extends ExtensionClass<ViewExtension, ComTipInfo>(ComTipInfo) {
    static PkgRes = ResPath.Ui_PkgCommon;

	override onCreate(): void {
        
    }

}
