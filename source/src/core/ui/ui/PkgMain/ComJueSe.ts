/** This is an automatically generated class by FairyGUI. Please do not modify it. **/

export default class ComJueSe extends fgui.GComponent {

	public ListRole:fgui.GList;
	public static URL:string = "ui://vith2b66sbd03";

	public static createInstance():ComJueSe {
		return <ComJueSe>(fgui.UIPackage.createObject("PkgMain", "ComJueSe"));
	}

	protected override onConstruct():void {
		this.ListRole = <fgui.GList>(this.getChildAt(0));
	}
}