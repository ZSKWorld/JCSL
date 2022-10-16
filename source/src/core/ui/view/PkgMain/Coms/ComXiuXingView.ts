import { ResPath } from "../../../../common/ResPath";
import { ExtensionClass } from "../../../../libs/utils/Util";
import { ViewExtension } from "../../../core/Interfaces";
import ComXiuXing from "../../../ui/PkgMain/ComXiuXing";

export const enum ComXiuXingMsg {

}

export class ComXiuXingView extends ExtensionClass<ViewExtension, ComXiuXing>(ComXiuXing) {
    static readonly PkgRes = ResPath.Ui_PkgMain;

    override onCreate(): void {

    }

}
