/** This is an automatically generated class by FairyGUI. Please do not modify it. **/

export default class RenderGongFa extends fgui.GComponent {

	public TxtName:fgui.GTextField;
	public TxtDesc:fgui.GTextField;
	public static URL:string = "ui://vith2b66sbd0j";

	public static createInstance():RenderGongFa {
		return <RenderGongFa>(fgui.UIPackage.createObject("PkgMain", "RenderGongFa"));
	}

	protected onConstruct():void {
		this.TxtName = <fgui.GTextField>(this.getChildAt(2));
		this.TxtDesc = <fgui.GTextField>(this.getChildAt(3));
	}
}