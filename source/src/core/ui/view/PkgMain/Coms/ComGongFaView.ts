import { ExtensionClass } from "../../../../libs/utils/Util";
import { ViewExtension } from "../../../core/Interfaces";
import ComGongFa from "../../../ui/PkgMain/ComGongFa";
import { ResPath } from "../../../../common/ResPath";

export const enum ComGongFaMsg {

}

export class ComGongFaView extends ExtensionClass<ViewExtension, ComGongFa>(ComGongFa) {
    static PkgRes = ResPath.Ui_PkgMain;

	override onCreate(): void {
        
    }

}
