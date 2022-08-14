import { BaseViewCtrl } from "../../../core/BaseViewCtrl";
import { ComItemInfoMsg, ComItemInfoView } from "../../../view/PkgMain/Coms/ComItemInfoView";

export interface ComItemInfoData{

}

export class ComItemInfoCtrl extends BaseViewCtrl<ComItemInfoView, ComItemInfoData>{

    override onAwake(): void {
        super.onAwake();
		this.addMessageListener(ComItemInfoMsg.OnBtnBgClick, this.ComItemInfo_OnBtnBgClick);
		this.addMessageListener(ComItemInfoMsg.OnBtnShouCangClick, this.ComItemInfo_OnBtnShouCangClick);
		this.addMessageListener(ComItemInfoMsg.OnBtnSellClick, this.ComItemInfo_OnBtnSellClick);
		this.addMessageListener(ComItemInfoMsg.OnBtnUseClick, this.ComItemInfo_OnBtnUseClick);
		this.addMessageListener(ComItemInfoMsg.OnBtnBuyClick, this.ComItemInfo_OnBtnBuyClick);
    }

    override onEnable(): void {
        super.onEnable();
    }

	private ComItemInfo_OnBtnBgClick(): void {
	
	}

	private ComItemInfo_OnBtnShouCangClick(): void {
	
	}

	private ComItemInfo_OnBtnSellClick(): void {
	
	}

	private ComItemInfo_OnBtnUseClick(): void {
	
	}

	private ComItemInfo_OnBtnBuyClick(): void {
	
	}

    override onDisable(): void {
        super.onDisable();
    }

    override onDestroy(): void {
        super.onDestroy();
    }
}