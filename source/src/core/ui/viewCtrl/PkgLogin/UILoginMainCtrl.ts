import { LogicSceneType } from "../../../../logicScene/LogicSceneType";
import { NotifyConst } from "../../../common/NotifyConst";
import { InsertNotify } from "../../../libs/event/EventMgr";
import { localData } from "../../../libs/localStorage/LocalData";
import { LocalDataKey } from "../../../libs/localStorage/LocalDataKey";
import { NetResponse } from "../../../net/NetResponse";
import { LoginInput } from "../../../net/network/ILogin";
import { LoginService, RegisterService } from "../../../net/Services";
import { BaseViewCtrl } from "../../core/BaseViewCtrl";
import { UIUtility } from "../../tool/UIUtility";
import { UILoginMainMsg, UILoginMainView } from "../../view/PkgLogin/UILoginMainView";

export interface UILoginMainData {

}

export class UILoginMainCtrl extends BaseViewCtrl<UILoginMainView, UILoginMainData>{

    override onAwake(): void {
        super.onAwake();
        this.addMessageListener(UILoginMainMsg.OnBtnLoginClick, this.UILoginMain_OnBtnLoginClick);
        this.addMessageListener(UILoginMainMsg.OnBtnRegisterClick, this.UILoginMain_OnBtnRegisterClick);
    }

    override onEnable(): void {
        super.onEnable();

        const data = localData.get<LoginInput>(LocalDataKey.LastLoginAccount);
        if (data) {
            this.view.setLoginInfo(data.account, data.password);
        }
    }

    private UILoginMain_OnBtnLoginClick(): void {
        const { TxtAccount, TxtPassword } = this.view;
        const param = { account: TxtAccount.text, password: TxtPassword.text };
        LoginService.Inst.login(param);
    }

    private UILoginMain_OnBtnRegisterClick(): void {
        const { TxtRegisterAccount, TxtRegisterPassword, TxtRegisterName } = this.view;
        if (!TxtRegisterAccount.text.trim()) UIUtility.ShowTipInfo("请输入账号");
        else if (!TxtRegisterPassword.text.trim()) UIUtility.ShowTipInfo("请输入密码");
        else if (!TxtRegisterName.text.trim()) UIUtility.ShowTipInfo("请输入昵称");
        else {
            RegisterService.Inst.register({
                account: TxtRegisterAccount.text,
                password: TxtRegisterPassword.text,
                nickname: TxtRegisterName.text
            });
        }
    }

    override onDisable(): void {
        super.onDisable();
    }

    override onDestroy(): void {
        super.onDestroy();
    }
}