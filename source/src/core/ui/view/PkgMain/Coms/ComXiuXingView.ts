import { ExtensionClass } from "../../../../libs/utils/Util";
import { ViewExtension } from "../../../core/Interfaces";
import ComXiuXing from "../../../ui/PkgMain/ComXiuXing";
import { ResPath } from "../../../../common/ResPath";

export const enum ComXiuXingMsg {

}

export class ComXiuXingView extends ExtensionClass<ViewExtension, ComXiuXing>(ComXiuXing) {
    static PkgRes = ResPath.Ui_PkgMain;

	override onCreate(): void {
        
    }

}
