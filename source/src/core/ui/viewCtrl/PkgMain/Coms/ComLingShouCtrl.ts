import { BaseViewCtrl } from "../../../core/BaseViewCtrl";
import { ComLingShouMsg, ComLingShouView } from "../../../view/PkgMain/Coms/ComLingShouView";

export interface ComLingShouData {

}

export class ComLingShouCtrl extends BaseViewCtrl<ComLingShouView, ComLingShouData>{

    override onAwake(): void {
        super.onAwake();
		this.addMessageListener(ComLingShouMsg.OnBtnCreateClick, this.ComLingShou_OnBtnCreateClick);
    }

    override onEnable(): void {
        super.onEnable();
    }

	private ComLingShou_OnBtnCreateClick(): void {
	
	}

    override onDisable(): void {
        super.onDisable();
    }

    override onDestroy(): void {
        super.onDestroy();
    }
}