import { BaseViewCtrl } from "../../core/BaseViewCtrl";
import { UIWaitingView } from "../../view/PkgCommon/UIWaitingView";

export class UIWaitingCtrl extends BaseViewCtrl<UIWaitingView, string>{

    override onAwake(): void {
        super.onAwake();

    }

    override onEnable(): void {
        super.onEnable();
        this.view.playWordAni(this.data);
    }

    override onUpdate(): void {
        this.view.updateWordAni();
    }


    override onDisable(): void {
        super.onDisable();
    }

    override onDestroy(): void {
        super.onDestroy();
    }
}