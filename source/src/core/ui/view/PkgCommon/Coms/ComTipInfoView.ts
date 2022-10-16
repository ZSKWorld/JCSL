import { ResPath } from "../../../../common/ResPath";
import { ExtensionClass } from "../../../../libs/utils/Util";
import { ViewExtension } from "../../../core/Interfaces";
import ComTipInfo from "../../../ui/PkgCommon/ComTipInfo";

export const enum ComTipInfoMsg {

}

export class ComTipInfoView extends ExtensionClass<ViewExtension, ComTipInfo>(ComTipInfo) {
    static readonly PkgRes = ResPath.Ui_PkgCommon;

    override onCreate(): void {

    }
    setAlpha(alpha: number) {
        this.alpha = alpha;
    }
    setContent(text: string, color: string) {
        this.text = text;
        this.color = color;
        this.setAlpha(1);
        this.setXY(Laya.stage.width / 2, Laya.stage.height / 2);
    }

    /**
     * 播放显示动画
     * @param onComplete {@link Laya.Handler} 完成回调
     */
    playShowAni(onComplete?: Laya.Handler, times?: number, delay?: number, startTime?: number, endTime?: number) {
        this.t0.play(onComplete, times, delay, startTime, endTime);
    }

}
