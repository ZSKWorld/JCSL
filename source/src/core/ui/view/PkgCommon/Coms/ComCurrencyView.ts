import { ResPath } from "../../../../common/ResPath";
import { InsertNotify } from "../../../../libs/event/EventMgr";
import { ExtensionClass } from "../../../../libs/utils/Util";
import { UserDataEvent } from "../../../../userData/UserDataEvent";
import { ViewExtension } from "../../../core/interfaces";
import ComCurrency from "../../../ui/PkgCommon/ComCurrency";

export const enum ComCurrencyMsg {
	OnBtnAddCoinClick = "ComCurrency_OnBtnAddCoinClick",
	OnBtnAddVcoinClick = "ComCurrency_OnBtnAddVcoinClick",
}

export class ComCurrencyView extends ExtensionClass<ViewExtension, ComCurrency>(ComCurrency) {
	static PkgRes = ResPath.Ui_PkgCommon;

	override onCreate(): void {
		const { BtnAddCoin, BtnAddVcoin } = this;
		BtnAddCoin.onClick(this, this.sendMessage, [ ComCurrencyMsg.OnBtnAddCoinClick ]);
		BtnAddVcoin.onClick(this, this.sendMessage, [ ComCurrencyMsg.OnBtnAddVcoinClick ]);
	}

	@InsertNotify(UserDataEvent.Coin_Changed)
	@InsertNotify(UserDataEvent.Vcoin_Changed)
	refreshMoney() {
		const { userData, TxtCoin, TxtVcoin } = this;
		const { coin, vcoin } = userData;
		TxtCoin.text = coin.toString();
		TxtVcoin.text = vcoin.toString();
	}

}
