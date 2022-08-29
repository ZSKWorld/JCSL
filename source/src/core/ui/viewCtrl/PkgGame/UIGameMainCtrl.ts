import { LogicSceneType } from "../../../../logicScene/LogicSceneType";
import { NotifyConst } from "../../../common/NotifyConst";
import { BaseViewCtrl, InsertKeyEvent, KeyEvent } from "../../core/BaseViewCtrl";
import { UIGameMainMsg, UIGameMainView } from "../../view/PkgGame/UIGameMainView";

export interface UIGameMainData {

}

export class UIGameMainCtrl extends BaseViewCtrl<UIGameMainView, UIGameMainData>{

    override onAwake(): void {
        super.onAwake();
        this.addMessageListener(UIGameMainMsg.OnBtnSettingClick, this.UIGameMain_OnBtnSettingClick);
    }

    override onEnable(): void {
        super.onEnable();
    }

    @InsertKeyEvent(KeyEvent.KeyUp, Laya.Keyboard.ESCAPE)
    private onBackClick() {
        this.dispatch(NotifyConst.EnterScene, LogicSceneType.MainScene);
    }

    private UIGameMain_OnBtnSettingClick(): void {

    }

    override onDisable(): void {
        super.onDisable();
    }

    override onDestroy(): void {
        super.onDestroy();
    }
}