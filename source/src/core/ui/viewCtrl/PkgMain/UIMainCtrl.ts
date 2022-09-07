import { BaseViewCtrl } from "../../core/BaseViewCtrl";
import { UIMainMsg, UIMainView } from "../../view/PkgMain/UIMainView";

export interface UIMainData{

}

export class UIMainCtrl extends BaseViewCtrl<UIMainView, UIMainData>{

    override onAwake(): void {
        super.onAwake();
		this.addMessageListener(UIMainMsg.OnBtnLingShouClick, this.UIMain_OnBtnLingShouClick);
		this.addMessageListener(UIMainMsg.OnBtnGongFaClick, this.UIMain_OnBtnGongFaClick);
		this.addMessageListener(UIMainMsg.OnBtnShiLianClick, this.UIMain_OnBtnShiLianClick);
		this.addMessageListener(UIMainMsg.OnBtnJueSeClick, this.UIMain_OnBtnJueSeClick);
		this.addMessageListener(UIMainMsg.OnBtnXiuXingClick, this.UIMain_OnBtnXiuXingClick);
    }

    override onEnable(): void {
        super.onEnable();
    }

	private UIMain_OnBtnLingShouClick(): void {
	
	}

	private UIMain_OnBtnGongFaClick(): void {
	
	}

	private UIMain_OnBtnShiLianClick(): void {
	
	}

	private UIMain_OnBtnJueSeClick(): void {
	
	}

	private UIMain_OnBtnXiuXingClick(): void {
	
	}

    override onDisable(): void {
        super.onDisable();
    }

    override onDestroy(): void {
        super.onDestroy();
    }
}