import { BaseViewCtrl } from "../../../core/BaseViewCtrl";
import { ComLingShouMsg, ComLingShouView } from "../../../view/PkgMain/Coms/ComLingShouView";

export interface ComLingShouData {

}

export class ComLingShouCtrl extends BaseViewCtrl<ComLingShouView, ComLingShouData>{

	override onAwake(): void {
		this.addMessageListener(ComLingShouMsg.OnBtnCreateClick, this.onBtnCreateClick);
	}

	override onEnable(): void {

	}

	private onBtnCreateClick(): void {

	}

	override onDisable(): void {

	}

	override onDestroy(): void {

	}
}