/** This is an automatically generated class by FairyGUI. Please do not modify it. **/

export default class ComXiuXing extends fgui.GComponent {

	public ctrlSelectType:fgui.Controller;
	public EffectShow:fgui.Transition;
	public EffectList:fgui.Transition;
	public static URL:string = "ui://vith2b66sbd02";

	public static createInstance():ComXiuXing {
		return <ComXiuXing>(fgui.UIPackage.createObject("PkgMain", "ComXiuXing"));
	}

	protected override onConstruct():void {
		this.ctrlSelectType = this.getControllerAt(0);
		this.EffectShow = this.getTransitionAt(0);
		this.EffectList = this.getTransitionAt(1);
	}
}