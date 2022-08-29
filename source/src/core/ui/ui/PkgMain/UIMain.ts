/** This is an automatically generated class by FairyGUI. Please do not modify it. **/

import ComLingShou from "./ComLingShou";
import ComGongFa from "./ComGongFa";
import ComShiLian from "./ComShiLian";
import ComJueSe from "./ComJueSe";
import ComXiuXing from "./ComXiuXing";

export default class UIMain extends fgui.GComponent {

	public ctrlShow:fgui.Controller;
	public ComLingShou:ComLingShou;
	public ComGongFa:ComGongFa;
	public ComShiLian:ComShiLian;
	public ComJueSe:ComJueSe;
	public ComXiuXing:ComXiuXing;
	public BtnLingShou:fgui.GButton;
	public BtnGongFa:fgui.GButton;
	public BtnShiLian:fgui.GButton;
	public BtnJueSe:fgui.GButton;
	public BtnXiuXing:fgui.GButton;
	public LoaderHead1:fgui.GLoader;
	public LoaderHead2:fgui.GLoader;
	public TxtJinBi:fgui.GTextField;
	public TxtTiLi:fgui.GTextField;
	public static URL:string = "ui://vith2b66qjdo0";

	public static createInstance():UIMain {
		return <UIMain>(fgui.UIPackage.createObject("PkgMain", "UIMain"));
	}

	protected override onConstruct():void {
		this.ctrlShow = this.getControllerAt(0);
		this.ComLingShou = <ComLingShou>(this.getChildAt(1));
		this.ComGongFa = <ComGongFa>(this.getChildAt(2));
		this.ComShiLian = <ComShiLian>(this.getChildAt(3));
		this.ComJueSe = <ComJueSe>(this.getChildAt(4));
		this.ComXiuXing = <ComXiuXing>(this.getChildAt(5));
		this.BtnLingShou = <fgui.GButton>(this.getChildAt(6));
		this.BtnGongFa = <fgui.GButton>(this.getChildAt(7));
		this.BtnShiLian = <fgui.GButton>(this.getChildAt(8));
		this.BtnJueSe = <fgui.GButton>(this.getChildAt(9));
		this.BtnXiuXing = <fgui.GButton>(this.getChildAt(10));
		this.LoaderHead1 = <fgui.GLoader>(this.getChildAt(14));
		this.LoaderHead2 = <fgui.GLoader>(this.getChildAt(15));
		this.TxtJinBi = <fgui.GTextField>(this.getChildAt(16));
		this.TxtTiLi = <fgui.GTextField>(this.getChildAt(17));
	}
}