import { ResPath } from "../../../../common/ResPath";
import { ExtensionClass } from "../../../../libs/utils/Util";
import { ViewExtension } from "../../../core/Interfaces";
import ComLingShou from "../../../ui/PkgMain/ComLingShou";

export const enum ComLingShouMsg {
    OnBtnCreateClick = "ComLingShou_OnBtnCreateClick",
}

export class ComLingShouView extends ExtensionClass<ViewExtension, ComLingShou>(ComLingShou) {
    static readonly PkgRes = ResPath.UIPath.PkgMain;

    override onCreate(): void {
        const { BtnCreate } = this;
        BtnCreate.onClick(this, this.sendMessage, [ ComLingShouMsg.OnBtnCreateClick ]);
    }

}
