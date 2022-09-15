import { LogicSceneType } from "../../../../logicScene/LogicSceneType";
import { NotifyConst } from "../../../common/NotifyConst";
import { BaseViewCtrl, InsertKeyEvent, KeyEvent } from "../../core/BaseViewCtrl";
import { UIGameMainMsg, UIGameMainView } from "../../view/PkgGame/UIGameMainView";

export interface UIGameMainData {

}

export class UIGameMainCtrl extends BaseViewCtrl<UIGameMainView, UIGameMainData>{

	override onAwake(): void {
		this.addMessageListener(UIGameMainMsg.OnBtnSettingClick, this.onBtnSettingClick);
	}

	override onEnable(): void {

	}

	override onDisable(): void {

	}

	override onDestroy(): void {

	}

	private onBtnSettingClick(): void {

	}

	@InsertKeyEvent(KeyEvent.KeyUp, Laya.Keyboard.ESCAPE)
	private exitGame() {
		this.dispatch(NotifyConst.EnterScene, LogicSceneType.MainScene);
	}

}