import { BaseViewCtrl } from "../../../core/BaseViewCtrl";
import { ComCurrencyMsg, ComCurrencyView } from "../../../view/PkgCommon/Coms/ComCurrencyView";

export interface ComCurrencyData {

}

export class ComCurrencyCtrl extends BaseViewCtrl<ComCurrencyView, ComCurrencyData>{

    override onAwake(): void {
		this.addMessageListener(ComCurrencyMsg.OnBtnAddCoinClick, this.ComCurrency_OnBtnAddCoinClick);
		this.addMessageListener(ComCurrencyMsg.OnBtnAddVcoinClick, this.ComCurrency_OnBtnAddVcoinClick);
    }

    override onEnable(): void {
		this.view.refreshMoney();
    }

	private ComCurrency_OnBtnAddCoinClick(): void {
	
	}

	private ComCurrency_OnBtnAddVcoinClick(): void {
	
	}

    override onDisable(): void {
        
    }

    override onDestroy(): void {
        
    }
}