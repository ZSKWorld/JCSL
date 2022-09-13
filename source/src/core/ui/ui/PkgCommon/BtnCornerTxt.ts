/** This is an automatically generated class by FairyGUI. Please do not modify it. **/

export default class BtnCornerTxt extends fgui.GButton {

	public ctrlBgColor:fgui.Controller;
	public t0:fgui.Transition;
	public t1:fgui.Transition;
	public static URL:string = "ui://vx9zwsersbd05i";

	public static createInstance():BtnCornerTxt {
		return <BtnCornerTxt>(fgui.UIPackage.createObject("PkgCommon", "BtnCornerTxt"));
	}

	protected override onConstruct():void {
		this.ctrlBgColor = this.getControllerAt(1);
		this.t0 = this.getTransitionAt(0);
		this.t1 = this.getTransitionAt(1);
	}
}