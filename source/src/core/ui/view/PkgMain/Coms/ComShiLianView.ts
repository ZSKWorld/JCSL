import { ResPath } from "../../../../common/ResPath";
import { ExtensionClass } from "../../../../libs/utils/Util";
import { ViewExtension } from "../../../core/Interfaces";
import ComShiLian from "../../../ui/PkgMain/ComShiLian";

export const enum ComShiLianMsg {

}

export class ComShiLianView extends ExtensionClass<ViewExtension, ComShiLian>(ComShiLian) {
    static readonly PkgRes = ResPath.Ui_PkgMain;

    override onCreate(): void {

    }

}
