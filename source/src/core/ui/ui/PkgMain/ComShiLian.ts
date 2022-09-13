/** This is an automatically generated class by FairyGUI. Please do not modify it. **/

export default class ComShiLian extends fgui.GComponent {

	public ListItem:fgui.GList;
	public static URL:string = "ui://vith2b66sbd04";

	public static createInstance():ComShiLian {
		return <ComShiLian>(fgui.UIPackage.createObject("PkgMain", "ComShiLian"));
	}

	protected override onConstruct():void {
		this.ListItem = <fgui.GList>(this.getChildAt(0));
	}
}