import { ResPath } from "../../../../common/ResPath";
import { ExtensionClass } from "../../../../libs/utils/Util";
import { ViewExtension } from "../../../core/Interfaces";
import ComGongFa from "../../../ui/PkgMain/ComGongFa";

export const enum ComGongFaMsg {

}

export class ComGongFaView extends ExtensionClass<ViewExtension, ComGongFa>(ComGongFa) {
    static readonly PkgRes = ResPath.Ui_PkgMain;

    override onCreate(): void {

    }

}
