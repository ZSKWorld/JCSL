/** This is an automatically generated class by FairyGUI. Please do not modify it. **/

export default class RenderShiLian extends fgui.GComponent {

	public TxtDesc:fgui.GRichTextField;
	public BtnEnter:fgui.GButton;
	public static URL:string = "ui://vith2b66neb71y";

	public static createInstance():RenderShiLian {
		return <RenderShiLian>(fgui.UIPackage.createObject("PkgMain", "RenderShiLian"));
	}

	protected onConstruct():void {
		this.TxtDesc = <fgui.GRichTextField>(this.getChildAt(1));
		this.BtnEnter = <fgui.GButton>(this.getChildAt(2));
	}
}