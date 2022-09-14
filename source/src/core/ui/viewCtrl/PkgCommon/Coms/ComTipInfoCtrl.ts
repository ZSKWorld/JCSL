import { tableMgr } from "../../../../table/TableManager";
import { BaseViewCtrl } from "../../../core/BaseViewCtrl";
import { UIPoolKey } from "../../../tool/UIPoolKey";
import { ComTipInfoView } from "../../../view/PkgCommon/Coms/ComTipInfoView";

export interface ComTipInfoData {
    text: string;
    color?: string;
}

export class ComTipInfoCtrl extends BaseViewCtrl<ComTipInfoView, ComTipInfoData>{

    private _speed: number = +tableMgr.Const[ 1004 ].Value;
    private _duration = (+tableMgr.Const[ 1002 ].Value) * 1000;
    private _time: number;
    private _moveEnable: boolean;

    override onEnable(): void {
        super.onEnable();
        this._time = this._duration;
        this._moveEnable = false;
        this.view.setContent(this.data.text, this.data.color || "#ffffff");
        this.view.playShowAni(Laya.Handler.create(this, () => {
            const lineNum = this.view.height <= 59 ? 1 : (1 + (this.view.height - 59) / 34);
            Laya.timer.once(lineNum * (+tableMgr.Const[ 1003 ].Value * 1000), this, () => {
                this._moveEnable = true;
            });
        }));
    }

    override onUpdate(): void {
        if (!this._moveEnable) return;
        const { view } = this;
        if (this._time <= 0) return view.removeFromParent();
        this._time -= Laya.timer.delta;
        view.setXY(view.x, view.y - this._speed);
        view.setAlpha(Math.max(0, this._time / this._duration));
    }

    override onDisable(): void {
        super.onDisable();
        Laya.Pool.recover(UIPoolKey.TipInfo, this.view);
    }
}