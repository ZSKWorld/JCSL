/** This is an automatically generated class by FairyGUI. Please do not modify it. **/

import ComCurrency from "./ComCurrency";
import UIWaiting from "./UIWaiting";
import WaitingItem from "./WaitingItem";
import ComTipInfo from "./ComTipInfo";
import BtnCornerTxt from "./BtnCornerTxt";
import UITipConfirm from "./UITipConfirm";
import ProgressBar1 from "./ProgressBar1";

export default class PkgCommonBinder {
	public static bindAll():void {
		fgui.UIObjectFactory.setExtension(ComCurrency.URL, ComCurrency);
		fgui.UIObjectFactory.setExtension(UIWaiting.URL, UIWaiting);
		fgui.UIObjectFactory.setExtension(WaitingItem.URL, WaitingItem);
		fgui.UIObjectFactory.setExtension(ComTipInfo.URL, ComTipInfo);
		fgui.UIObjectFactory.setExtension(BtnCornerTxt.URL, BtnCornerTxt);
		fgui.UIObjectFactory.setExtension(UITipConfirm.URL, UITipConfirm);
		fgui.UIObjectFactory.setExtension(ProgressBar1.URL, ProgressBar1);
	}
}