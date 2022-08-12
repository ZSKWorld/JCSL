/** This is an automatically generated class by FairyGUI. Please do not modify it. **/

export default class UIGameMain extends fgui.GComponent {

	public BtnSetting:fgui.GButton;
	public static URL:string = "ui://dzfu19oeikt10";

	public static createInstance():UIGameMain {
		return <UIGameMain>(fgui.UIPackage.createObject("PkgGame", "UIGameMain"));
	}

	protected override onConstruct():void {
		this.BtnSetting = <fgui.GButton>(this.getChildAt(0));
	}
}