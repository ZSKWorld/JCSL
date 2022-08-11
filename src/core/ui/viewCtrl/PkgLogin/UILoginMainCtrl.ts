import { LogicSceneType } from "../../../../logicScene/LogicSceneType";
import { NotifyConst } from "../../../common/NotifyConst";
import { BaseViewCtrl } from "../../core/BaseViewCtrl";
import { UILoginMainMsg, UILoginMainView } from "../../view/PkgLogin/UILoginMainView";

export interface UILoginMainData{

}

export class UILoginMainCtrl extends BaseViewCtrl<UILoginMainView, UILoginMainData>{

    override onAwake(): void {
        super.onAwake();
		this.addMessageListener(UILoginMainMsg.OnBtnLoginClick, this.UILoginMain_OnBtnLoginClick);
		this.addMessageListener(UILoginMainMsg.OnBtnLoginRegisterClick, this.UILoginMain_OnBtnLoginRegisterClick);
		this.addMessageListener(UILoginMainMsg.OnBtnRegisterBackClick, this.UILoginMain_OnBtnRegisterBackClick);
		this.addMessageListener(UILoginMainMsg.OnBtnRegisterClick, this.UILoginMain_OnBtnRegisterClick);
    }

    override onEnable(): void {
        super.onEnable();
    }

	private UILoginMain_OnBtnLoginClick(): void {
        this.dispatch(NotifyConst.EnterScene, LogicSceneType.MainScene);
	}

	private UILoginMain_OnBtnLoginRegisterClick(): void {
	
	}

	private UILoginMain_OnBtnRegisterBackClick(): void {
	
	}

	private UILoginMain_OnBtnRegisterClick(): void {
	
	}

    override onDisable(): void {
        super.onDisable();
    }

    override onDestroy(): void {
        super.onDestroy();
    }
}