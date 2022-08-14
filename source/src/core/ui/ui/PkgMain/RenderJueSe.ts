/** This is an automatically generated class by FairyGUI. Please do not modify it. **/

export default class RenderJueSe extends fgui.GButton {

	public bg:fgui.GGraph;
	public TxtName:fgui.GTextField;
	public TxtCount:fgui.GTextField;
	public static URL:string = "ui://vith2b66neb71z";

	public static createInstance():RenderJueSe {
		return <RenderJueSe>(fgui.UIPackage.createObject("PkgMain", "RenderJueSe"));
	}

	protected override onConstruct():void {
		this.bg = <fgui.GGraph>(this.getChildAt(0));
		this.TxtName = <fgui.GTextField>(this.getChildAt(2));
		this.TxtCount = <fgui.GTextField>(this.getChildAt(3));
	}
}