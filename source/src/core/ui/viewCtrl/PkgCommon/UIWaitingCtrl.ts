import { BaseViewCtrl } from "../../core/BaseViewCtrl";
import { UIWaitingMsg, UIWaitingView } from "../../view/PkgCommon/UIWaitingView";

export interface UIWaitingData{

}

export class UIWaitingCtrl extends BaseViewCtrl<UIWaitingView, UIWaitingData>{

    override onAwake(): void {
        super.onAwake();

    }

    override onEnable(): void {
        super.onEnable();
    }


    override onDisable(): void {
        super.onDisable();
    }

    override onDestroy(): void {
        super.onDestroy();
    }
}