/** This is an automatically generated class by FairyGUI. Please do not modify it. **/

export default class ComCurrency extends fgui.GComponent {

	public BtnAddCoin:fgui.GButton;
	public BtnAddVcoin:fgui.GButton;
	public TxtCoin:fgui.GTextField;
	public TxtVcoin:fgui.GTextField;
	public static URL:string = "ui://vx9zwsergc8g63";

	public static createInstance():ComCurrency {
		return <ComCurrency>(fgui.UIPackage.createObject("PkgCommon", "ComCurrency"));
	}

	protected override onConstruct():void {
		this.BtnAddCoin = <fgui.GButton>(this.getChildAt(2));
		this.BtnAddVcoin = <fgui.GButton>(this.getChildAt(3));
		this.TxtCoin = <fgui.GTextField>(this.getChildAt(6));
		this.TxtVcoin = <fgui.GTextField>(this.getChildAt(7));
	}
}