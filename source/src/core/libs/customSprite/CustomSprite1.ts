import { BaseCustomSprite } from "./BaseCustomSprite";
class DissValue2D extends Laya.Value2D {
    constructor(mainID: number, subID: number) {
        super(mainID, subID);
        this._attribLocation = [ "posuv2", 5 ];
    }
    public u_Alph: number;
    public u_Time: number = 0;
    public u_NoiseTex: Laya.Texture2D;
}
export class CustomSprite1 extends BaseCustomSprite<DissValue2D> {

    //定义一个shaderid  用于laya在查找shader 时使用
    static MainID: number = 1000;

    constructor() {
        super();
        this.shaderValue = new DissValue2D(CustomSprite1.MainID, 0);
    }

    /**
     * 设置噪图纹理
     * @param t
     */
    setNoiseTexture(t: Laya.Texture2D) {
        //这里的名字是在shader里 定义好的。
        this.shaderValue.u_NoiseTex = t;
    }

    setNoiseTexSkin(skin: string) {
        Laya.loader.load(skin, new Laya.Handler(this, (tex) => {
            this.shaderValue.u_NoiseTex = tex._getSource();
        }));
    }

    /**
     * 设置消融范围  0 是原图  1 是消失完成
     * @param t
     */
    setDissolveThreshold(t: number) {
        this.shaderValue.u_Alph = t;
    }

    protected override onCustomRender() {
        this.shaderValue.u_Time += Laya.timer.delta;
    }

}