/** This is an automatically generated class by FairyGUI. Please do not modify it. **/

export default class ComShiLian extends fgui.GComponent {

	public ListItem:fgui.GList;
	public t0:fgui.Transition;
	public RenWuIn:fgui.Transition;
	public RenWuOut:fgui.Transition;
	public XinFaIn:fgui.Transition;
	public XinFaOut:fgui.Transition;
	public SkillIn:fgui.Transition;
	public SkillOut:fgui.Transition;
	public static URL:string = "ui://vith2b66sbd04";

	public static createInstance():ComShiLian {
		return <ComShiLian>(fgui.UIPackage.createObject("PkgMain", "ComShiLian"));
	}

	protected override onConstruct():void {
		this.ListItem = <fgui.GList>(this.getChildAt(0));
		this.t0 = this.getTransitionAt(0);
		this.RenWuIn = this.getTransitionAt(1);
		this.RenWuOut = this.getTransitionAt(2);
		this.XinFaIn = this.getTransitionAt(3);
		this.XinFaOut = this.getTransitionAt(4);
		this.SkillIn = this.getTransitionAt(5);
		this.SkillOut = this.getTransitionAt(6);
	}
}