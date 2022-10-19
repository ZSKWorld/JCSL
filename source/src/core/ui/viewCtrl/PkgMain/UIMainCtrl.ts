import { BaseViewCtrl } from "../../core/BaseViewCtrl";
import { UIMainMsg, UIMainView } from "../../view/PkgMain/UIMainView";

export interface UIMainData {

}

export class UIMainCtrl extends BaseViewCtrl<UIMainView, UIMainData>{

	override onAwake(): void {
		this.addMessageListener(UIMainMsg.OnBtnLingShouClick, this.onBtnLingShouClick);
		this.addMessageListener(UIMainMsg.OnBtnGongFaClick, this.onBtnGongFaClick);
		this.addMessageListener(UIMainMsg.OnBtnShiLianClick, this.onBtnShiLianClick);
		this.addMessageListener(UIMainMsg.OnBtnJueSeClick, this.onBtnJueSeClick);
		this.addMessageListener(UIMainMsg.OnBtnXiuXingClick, this.onBtnXiuXingClick);
	}

	override onEnable(): void {

	}

	override onDisable(): void {

	}

	override onDestroy(): void {

	}

	private onBtnLingShouClick(): void {

	}

	private onBtnGongFaClick(): void {

	}

	private onBtnShiLianClick(): void {

	}

	private onBtnJueSeClick(): void {

	}

	private onBtnXiuXingClick(): void {

	}
}