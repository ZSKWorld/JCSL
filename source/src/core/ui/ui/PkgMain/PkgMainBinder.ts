/** This is an automatically generated class by FairyGUI. Please do not modify it. **/

import RenderShiLian from "./RenderShiLian";
import RenderJueSe from "./RenderJueSe";
import UIMain from "./UIMain";
import ComGongFa from "./ComGongFa";
import ComXiuXing from "./ComXiuXing";
import ComJueSe from "./ComJueSe";
import ComShiLian from "./ComShiLian";
import ComLingShou from "./ComLingShou";
import RenderGongFa from "./RenderGongFa";
import CmbDongFu_item from "./CmbDongFu_item";
import CmbDongFu_popup from "./CmbDongFu_popup";
import CmbDongFu from "./CmbDongFu";
import UISetting from "./UISetting";

export default class PkgMainBinder {
	public static bindAll():void {
		fgui.UIObjectFactory.setExtension(RenderShiLian.URL, RenderShiLian);
		fgui.UIObjectFactory.setExtension(RenderJueSe.URL, RenderJueSe);
		fgui.UIObjectFactory.setExtension(UIMain.URL, UIMain);
		fgui.UIObjectFactory.setExtension(ComGongFa.URL, ComGongFa);
		fgui.UIObjectFactory.setExtension(ComXiuXing.URL, ComXiuXing);
		fgui.UIObjectFactory.setExtension(ComJueSe.URL, ComJueSe);
		fgui.UIObjectFactory.setExtension(ComShiLian.URL, ComShiLian);
		fgui.UIObjectFactory.setExtension(ComLingShou.URL, ComLingShou);
		fgui.UIObjectFactory.setExtension(RenderGongFa.URL, RenderGongFa);
		fgui.UIObjectFactory.setExtension(CmbDongFu_item.URL, CmbDongFu_item);
		fgui.UIObjectFactory.setExtension(CmbDongFu_popup.URL, CmbDongFu_popup);
		fgui.UIObjectFactory.setExtension(CmbDongFu.URL, CmbDongFu);
		fgui.UIObjectFactory.setExtension(UISetting.URL, UISetting);
	}
}