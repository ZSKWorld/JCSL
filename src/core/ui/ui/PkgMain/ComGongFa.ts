/** This is an automatically generated class by FairyGUI. Please do not modify it. **/

export default class ComGongFa extends fgui.GComponent {

	public ListItem:fgui.GList;
	public EffectShow:fgui.Transition;
	public static URL:string = "ui://vith2b66sbd01";

	public static createInstance():ComGongFa {
		return <ComGongFa>(fgui.UIPackage.createObject("PkgMain", "ComGongFa"));
	}

	protected onConstruct():void {
		this.ListItem = <fgui.GList>(this.getChildAt(0));
		this.EffectShow = this.getTransitionAt(0);
	}
}