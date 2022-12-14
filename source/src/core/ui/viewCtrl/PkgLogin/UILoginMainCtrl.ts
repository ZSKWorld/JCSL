import { localData } from "../../../libs/localStorage/LocalData";
import { LocalDataKey } from "../../../libs/localStorage/LocalDataKey";
import { LoginService, RegisterService } from "../../../net/Services";
import { BaseViewCtrl } from "../../core/BaseViewCtrl";
import { UIUtility } from "../../tool/UIUtility";
import { UILoginMainMsg, UILoginMainView } from "../../view/PkgLogin/UILoginMainView";

export interface UILoginMainData {

}

export class UILoginMainCtrl extends BaseViewCtrl<UILoginMainView, UILoginMainData>{

    override onAwake(): void {
        this.addMessageListener(UILoginMainMsg.OnBtnLoginClick, this.onBtnLoginClick);
        this.addMessageListener(UILoginMainMsg.OnBtnRegisterClick, this.onBtnRegisterClick);
    }

    override onEnable(): void {
        const data = localData.get<LoginInput>(LocalDataKey.LastLoginAccount);
        data && this.view.setLoginInfo(data.account, data.password);
    }

    override onDisable(): void {

    }

    override onDestroy(): void {

    }

    private onBtnLoginClick(): void {
        const { TxtAccount, TxtPassword } = this.view;
        const param = { account: TxtAccount.text, password: TxtPassword.text };
        LoginService.Inst.login(param);
    }

    private onBtnRegisterClick(): void {
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
}