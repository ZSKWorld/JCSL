import { ExtensionClass } from "../../../../libs/utils/Util";
import { ViewExtension } from "../../../core/Interfaces";
import ComLingShou from "../../../ui/PkgMain/ComLingShou";
import { ResPath } from "../../../../common/ResPath";

export const enum ComLingShouMsg {
	OnBtnCreateClick = "ComLingShou_OnBtnCreateClick",
}

export class ComLingShouView extends ExtensionClass<ViewExtension, ComLingShou>(ComLingShou) {
    static PkgRes = ResPath.Ui_PkgMain;

	override onCreate(): void {
        const { BtnCreate } = this;
	    BtnCreate.onClick(this, this.sendMessage, [ ComLingShouMsg.OnBtnCreateClick ]);
    }

}
