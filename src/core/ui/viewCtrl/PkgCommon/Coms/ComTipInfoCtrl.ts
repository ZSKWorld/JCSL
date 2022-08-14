import { tableMgr } from "../../../../table/TableManager";
import { BaseViewCtrl } from "../../../core/BaseViewCtrl";
import { UIPoolKey } from "../../../tool/UIPoolKey";
import { ComTipInfoView } from "../../../view/PkgCommon/Coms/ComTipInfoView";

export interface ComTipInfoData {
    text: string;
    color?: string;
}

export class ComTipInfoCtrl extends BaseViewCtrl<ComTipInfoView, ComTipInfoData>{

    private speed: number = +tableMgr.Const[ 1004 ].Value;
    private duration = (+tableMgr.Const[ 1002 ].Value) * 1000;
    private time: number;
    private moveEnable: boolean;

    override onEnable(): void {
        super.onEnable();
        this.time = this.duration;
        this.moveEnable = false;
        this.view.setContent(this.data.text, this.data.color || "#ffffff");
        this.view.playShowAni(Laya.Handler.create(this, () => {
            const lineNum = this.view.height <= 59 ? 1 : (1 + (this.view.height - 59) / 34);
            Laya.timer.once(lineNum * (+tableMgr.Const[ 1003 ].Value * 1000), this, () => {
                this.moveEnable = true;
            });
        }));
    }

    override onUpdate(): void {
        if (!this.moveEnable) return;
        const { view } = this;
        if (this.time <= 0) return view.removeFromParent();
        this.time -= Laya.timer.delta;
        view.setXY(view.x, view.y - this.speed);
        view.setAlpha(Math.max(0, this.time / this.duration));
    }

    override onDisable(): void {
        super.onDisable();
        Laya.Pool.recover(UIPoolKey.TipInfo, this.view);
    }
}