import { ResPath } from "../../core/common/ResPath";
import { CustomSprite1 } from "../../core/libs/customSprite/CustomSprite1";
import { uiMgr } from "../../core/ui/core/UIManager";
import { ViewID } from "../../core/ui/core/ViewID";
import { LogicSceneBase } from "../LogicSceneBase";

/**
 * @Author       : zsk
 * @Date         : 2022-08-05 21:17:13
 * @LastEditors  : zsk
 * @LastEditTime : 2022-09-18 03:44:24
 * @Description  : 登录逻辑场景
 */
export class LogicSceneLogin extends LogicSceneBase {
	protected override getResArray(): string[] {
		return [ ResPath.Ui_PkgLogin ];
	}

	protected onEnter(): void {
		uiMgr.addView(ViewID.LoginMainView);
		this.aaaa();
	}

	protected onExit(): void {
	}

	private _value: number = 0;

	private aaaa() {
		const url = "res/ui/PkgCommon_atlas0.png";
		Laya.loader.load(url, Laya.Handler.create(this, () => {
			const texture = Laya.Loader.getRes(url);
			const spe = new CustomSprite1();
			spe.texture = texture;
			//设置噪图路径
			spe.setNoiseTexSkin("mask.png");
			spe.setDissolveThreshold(0);
			spe.x = Laya.stage.width / 2 - texture.width / 2;
			spe.y = Laya.stage.height / 2 - texture.height / 2;
			Laya.stage.addChild(spe);
			Laya.stage.on(Laya.Event.KEY_DOWN, this, (e: Laya.Event) => {
				if (e.keyCode == Laya.Keyboard.A) {
					this._value -= 0.1;
				} else if (e.keyCode == Laya.Keyboard.S) {
					this._value += 0.1;
				} else {
					return;
				}
				this._value = Math.max(0, Math.min(this._value, 1));
				console.log(this._value);
				spe.setDissolveThreshold(this._value);
			});
		}));
	}

}