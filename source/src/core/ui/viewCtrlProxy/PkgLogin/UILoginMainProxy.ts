import { LogicSceneType } from "../../../../logicScene/LogicSceneType";
import { NotifyConst } from "../../../common/NotifyConst";
import { InsertNotify } from "../../../libs/event/EventMgr";
import { localData } from "../../../libs/localStorage/LocalData";
import { LocalDataKey } from "../../../libs/localStorage/LocalDataKey";
import { NetResponse } from "../../../net/NetResponse";
import { BaseViewCtrlProxy } from "../../core/BaseViewCtrlProxy";
import { UILoginMainMsg } from "../../view/PkgLogin/UILoginMainView";
import { UILoginMainCtrl } from "../../viewCtrl/PkgLogin/UILoginMainCtrl";

export class UILoginMainProxy extends BaseViewCtrlProxy<UILoginMainCtrl>{

    @InsertNotify(NetResponse.Response_Login)
    private loginResponse() {
        const { TxtAccount, TxtPassword } = this.viewCtrl.view;
        const param = { account: TxtAccount.text, password: TxtPassword.text };
        localData.set(LocalDataKey.LastLoginAccount, param);
        this.dispatch(NotifyConst.EnterScene, LogicSceneType.MainScene);
    }

    @InsertNotify(NetResponse.Response_Register)
    private registerResponse() {
        this.viewCtrl.view.afterRegister();
        this.sendMessage(UILoginMainMsg.OnBtnLoginClick);
    }
}