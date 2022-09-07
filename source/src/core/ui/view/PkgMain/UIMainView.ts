import { ExtensionClass } from "../../../libs/utils/Util";
import { ViewExtension } from "../../core/interfaces";
import UIMain from "../../ui/PkgMain/UIMain";
import { ResPath } from "../../../common/ResPath";
import { ViewID } from "../../core/ViewID";

export const enum UIMainMsg {
	OnBtnLingShouClick = "UIMain_OnBtnLingShouClick",
	OnBtnGongFaClick = "UIMain_OnBtnGongFaClick",
	OnBtnShiLianClick = "UIMain_OnBtnShiLianClick",
	OnBtnJueSeClick = "UIMain_OnBtnJueSeClick",
	OnBtnXiuXingClick = "UIMain_OnBtnXiuXingClick",
}

export class UIMainView extends ExtensionClass<ViewExtension, UIMain>(UIMain) {
    static PkgRes = ResPath.Ui_PkgMain;

	override onCreate(): void {
        const { listener, ComLingShou, ComGongFa, ComShiLian, ComJueSe, ComXiuXing, ComCurrency, BtnLingShou, BtnGongFa, BtnShiLian, BtnJueSe, BtnXiuXing } = this;
	    BtnLingShou.onClick(this, this.sendMessage, [ UIMainMsg.OnBtnLingShouClick ]);
	    BtnGongFa.onClick(this, this.sendMessage, [ UIMainMsg.OnBtnGongFaClick ]);
	    BtnShiLian.onClick(this, this.sendMessage, [ UIMainMsg.OnBtnShiLianClick ]);
	    BtnJueSe.onClick(this, this.sendMessage, [ UIMainMsg.OnBtnJueSeClick ]);
	    BtnXiuXing.onClick(this, this.sendMessage, [ UIMainMsg.OnBtnXiuXingClick ]);

		this.initView(ViewID.ComLingShouView, ComLingShou, listener);
		this.initView(ViewID.ComGongFaView, ComGongFa, listener);
		this.initView(ViewID.ComShiLianView, ComShiLian, listener);
		this.initView(ViewID.ComJueSeView, ComJueSe, listener);
		this.initView(ViewID.ComXiuXingView, ComXiuXing, listener);
		this.initView(ViewID.ComCurrencyView, ComCurrency, listener);
    }

}
