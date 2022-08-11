/** This is an automatically generated class by FairyGUI. Please do not modify it. **/

import WaitingItem from "./WaitingItem";

export default class UIWaiting extends fgui.GComponent {

	public ComWaiting:WaitingItem;
	public static URL:string = "ui://vx9zwserlsqf62";

	public static createInstance():UIWaiting {
		return <UIWaiting>(fgui.UIPackage.createObject("PkgCommon", "UIWaiting"));
	}

	protected onConstruct():void {
		this.ComWaiting = <WaitingItem>(this.getChildAt(1));
	}
}