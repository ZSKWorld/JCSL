import { ResPath } from "../../../common/ResPath";
import { ExtensionClass } from "../../../libs/utils/Util";
import { ViewExtension } from "../../core/interfaces";
import UILoginMain from "../../ui/PkgLogin/UILoginMain";

export const enum UILoginMainMsg {
	OnBtnLoginClick = "UILoginMain_OnBtnLoginClick",
	OnBtnRegisterClick = "UILoginMain_OnBtnRegisterClick",
}

export class UILoginMainView extends ExtensionClass<ViewExtension, UILoginMain>(UILoginMain) {
	static PkgRes = ResPath.Ui_PkgLogin;

	override onCreate(): void {
		const { BtnLogin, BtnRegister } = this;
		BtnLogin.onClick(this, this.sendMessage, [ UILoginMainMsg.OnBtnLoginClick ]);
		BtnRegister.onClick(this, this.sendMessage, [ UILoginMainMsg.OnBtnRegisterClick ]);
	}

	setLoginInfo(account: string, password: string) {
		this.TxtAccount.text = account;
		this.TxtPassword.text = password;
	}

	afterRegister(){
        const { TxtRegisterAccount, TxtRegisterPassword } = this;
        this.setLoginInfo(TxtRegisterAccount.text, TxtRegisterPassword.text);
        this.ctrlState.selectedIndex = 0;
	}

}
