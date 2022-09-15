import { BaseViewCtrl } from "../../core/BaseViewCtrl";
import { UIWaitingView } from "../../view/PkgCommon/UIWaitingView";

export class UIWaitingCtrl extends BaseViewCtrl<UIWaitingView, string>{

    override onAwake(): void {
        
    }

    override onEnable(): void {
        this.view.playWordAni(this.data);
    }

    override onUpdate(): void {
        this.view.updateWordAni();
    }


    override onDisable(): void {
        
    }

    override onDestroy(): void {
        
    }
}