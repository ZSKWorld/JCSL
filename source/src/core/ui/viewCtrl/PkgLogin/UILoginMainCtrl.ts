import { LogicSceneType } from "../../../../logicScene/LogicSceneType";
import { NotifyConst } from "../../../common/NotifyConst";
import { localData } from "../../../libs/localStorage/LocalData";
import { LocalDataKey } from "../../../libs/localStorage/LocalDataKey";
import { LoginInput } from "../../../net/network/ILogin";
import { LoginService } from "../../../net/server/LoginService";
import { RegisterService } from "../../../net/server/RegisterService";
import { BaseViewCtrl } from "../../core/BaseViewCtrl";
import { UIUtility } from "../../tool/UIUtility";
import { UILoginMainMsg, UILoginMainView } from "../../view/PkgLogin/UILoginMainView";

export interface UILoginMainData {

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

        const data = localData.get<LoginInput>(LocalDataKey.LastLoginAccount);
        if (data) {
            this.view.setLoginInfo(data.account, data.password);
        }
    }

    private UILoginMain_OnBtnLoginClick(): void {
        const { TxtAccount, TxtPassword } = this.view;
        const param = { account: TxtAccount.text, password: TxtPassword.text };
        LoginService.Inst.login(param).then((res) => {
            if (!res.error) {
                localData.set(LocalDataKey.LastLoginAccount, param);
                this.dispatch(NotifyConst.EnterScene, LogicSceneType.MainScene);
            }
            else
                UIUtility.ShowTipInfo("账号或密码错误");
        });
    }

    private UILoginMain_OnBtnLoginRegisterClick(): void {

    }

    private UILoginMain_OnBtnRegisterBackClick(): void {

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
            }).then((res) => {
                if (!res.error) {
                    this.view.setLoginInfo(TxtRegisterAccount.text, TxtRegisterPassword.text);
                    this.view.ctrlState.selectedIndex = 0;
                    this.UILoginMain_OnBtnLoginClick();
                }
            })
        }
    }

    override onDisable(): void {
        super.onDisable();
    }

    override onDestroy(): void {
        super.onDestroy();
    }
}