import { BaseViewCtrl } from "../../core/BaseViewCtrl";
import { UISettingMsg, UISettingView } from "../../view/PkgMain/UISettingView";

export interface UISettingData {

}

export class UISettingCtrl extends BaseViewCtrl<UISettingView, UISettingData>{

    override onAwake(): void {
		this.addMessageListener(UISettingMsg.OnBtnBgClick, this.UISetting_OnBtnBgClick);
		this.addMessageListener(UISettingMsg.OnBtnHangUpClick, this.UISetting_OnBtnHangUpClick);
		this.addMessageListener(UISettingMsg.OnBtnMuteClick, this.UISetting_OnBtnMuteClick);
		this.addMessageListener(UISettingMsg.OnBtnSignInClick, this.UISetting_OnBtnSignInClick);
		this.addMessageListener(UISettingMsg.OnBtnHelpClick, this.UISetting_OnBtnHelpClick);
		this.addMessageListener(UISettingMsg.OnBtnClearAccountClick, this.UISetting_OnBtnClearAccountClick);
		this.addMessageListener(UISettingMsg.OnBtnBackClick, this.UISetting_OnBtnBackClick);
    }

    override onEnable(): void {
        
    }

	private UISetting_OnBtnBgClick(): void {
	
	}

	private UISetting_OnBtnHangUpClick(): void {
	
	}

	private UISetting_OnBtnMuteClick(): void {
	
	}

	private UISetting_OnBtnSignInClick(): void {
	
	}

	private UISetting_OnBtnHelpClick(): void {
	
	}

	private UISetting_OnBtnClearAccountClick(): void {
	
	}

	private UISetting_OnBtnBackClick(): void {
	
	}

    override onDisable(): void {
        
    }

    override onDestroy(): void {
        
    }
}