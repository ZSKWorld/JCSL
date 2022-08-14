import { ExtensionClass } from "../../../libs/utils/Util";
import { ViewExtension } from "../../core/interfaces";
import UILoginMain from "../../ui/PkgLogin/UILoginMain";
import { ResPath } from "../../../common/ResPath";

export const enum UILoginMainMsg {
	OnBtnLoginClick = "UILoginMain_OnBtnLoginClick",
	OnBtnLoginRegisterClick = "UILoginMain_OnBtnLoginRegisterClick",
	OnBtnRegisterBackClick = "UILoginMain_OnBtnRegisterBackClick",
	OnBtnRegisterClick = "UILoginMain_OnBtnRegisterClick",
}

export class UILoginMainView extends ExtensionClass<ViewExtension, UILoginMain>(UILoginMain) {
    static PkgRes = ResPath.Ui_PkgLogin;

	override onCreate(): void {
        const { BtnLogin, BtnLoginRegister, BtnRegisterBack, BtnRegister } = this;
	    BtnLogin.onClick(this, this.sendMessage, [UILoginMainMsg.OnBtnLoginClick]);
	    BtnLoginRegister.onClick(this, this.sendMessage, [UILoginMainMsg.OnBtnLoginRegisterClick]);
	    BtnRegisterBack.onClick(this, this.sendMessage, [UILoginMainMsg.OnBtnRegisterBackClick]);
	    BtnRegister.onClick(this, this.sendMessage, [UILoginMainMsg.OnBtnRegisterClick]);
    }

	setLoginInfo(account:string,password:string){
		this.TxtAccount.text = account;
		this.TxtPassword.text = password;
	}

}
