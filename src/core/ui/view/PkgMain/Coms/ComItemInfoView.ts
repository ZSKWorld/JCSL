import { ExtensionClass } from "../../../../libs/utils/Util";
import { ViewExtension } from "../../../core/interfaces";
import ComItemInfo from "../../../ui/PkgMain/ComItemInfo";
import { ResPath } from "../../../../common/ResPath";

export const enum ComItemInfoMsg {
	OnBtnBgClick = "ComItemInfo_OnBtnBgClick",
	OnBtnShouCangClick = "ComItemInfo_OnBtnShouCangClick",
	OnBtnSellClick = "ComItemInfo_OnBtnSellClick",
	OnBtnUseClick = "ComItemInfo_OnBtnUseClick",
	OnBtnBuyClick = "ComItemInfo_OnBtnBuyClick",
}

export class ComItemInfoView extends ExtensionClass<ViewExtension, ComItemInfo>(ComItemInfo) {
    static PkgRes = ResPath.Ui_PkgMain;

	override onCreate(): void {
        const { BtnBg, BtnShouCang, BtnSell, BtnUse, BtnBuy } = this;
	    BtnBg.onClick(this, this.sendMessage, [ComItemInfoMsg.OnBtnBgClick]);
	    BtnShouCang.onClick(this, this.sendMessage, [ComItemInfoMsg.OnBtnShouCangClick]);
	    BtnSell.onClick(this, this.sendMessage, [ComItemInfoMsg.OnBtnSellClick]);
	    BtnUse.onClick(this, this.sendMessage, [ComItemInfoMsg.OnBtnUseClick]);
	    BtnBuy.onClick(this, this.sendMessage, [ComItemInfoMsg.OnBtnBuyClick]);
    }

}
