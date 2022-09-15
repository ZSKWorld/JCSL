import { BaseViewCtrl } from "../../../core/BaseViewCtrl";
import { ComCurrencyMsg, ComCurrencyView } from "../../../view/PkgCommon/Coms/ComCurrencyView";

export interface ComCurrencyData {

}

export class ComCurrencyCtrl extends BaseViewCtrl<ComCurrencyView, ComCurrencyData>{

	override onAwake(): void {
		this.addMessageListener(ComCurrencyMsg.OnBtnAddCoinClick, this.onBtnAddCoinClick);
		this.addMessageListener(ComCurrencyMsg.OnBtnAddVcoinClick, this.onBtnAddVcoinClick);
	}

	override onEnable(): void {
		this.view.refreshMoney();
	}

	override onDisable(): void {

	}

	override onDestroy(): void {

	}

	private onBtnAddCoinClick(): void {

	}

	private onBtnAddVcoinClick(): void {

	}
}