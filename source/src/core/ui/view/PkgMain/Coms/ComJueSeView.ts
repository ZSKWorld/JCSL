import { ExtensionClass } from "../../../../libs/utils/Util";
import { ViewExtension } from "../../../core/Interfaces";
import ComJueSe from "../../../ui/PkgMain/ComJueSe";
import { ResPath } from "../../../../common/ResPath";

export const enum ComJueSeMsg {

}

export class ComJueSeView extends ExtensionClass<ViewExtension, ComJueSe>(ComJueSe) {
    static PkgRes = ResPath.Ui_PkgMain;

	override onCreate(): void {
        
    }

}
