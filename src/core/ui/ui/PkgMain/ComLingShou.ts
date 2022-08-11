/** This is an automatically generated class by FairyGUI. Please do not modify it. **/

export default class ComLingShou extends fgui.GComponent {

	public BtnCreate:fgui.GButton;
	public static URL:string = "ui://vith2b66sbd05";

	public static createInstance():ComLingShou {
		return <ComLingShou>(fgui.UIPackage.createObject("PkgMain", "ComLingShou"));
	}

	protected onConstruct():void {
		this.BtnCreate = <fgui.GButton>(this.getChildAt(0));
	}
}