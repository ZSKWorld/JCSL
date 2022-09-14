import { LogicSceneType } from "../../../../../logicScene/LogicSceneType";
import { NotifyConst } from "../../../../common/NotifyConst";
import { ExtensionClass } from "../../../../libs/utils/Util";
import { GComponentExtend } from "../../../core/Interfaces";
import RenderShiLian from "../../../ui/PkgMain/RenderShiLian";

export class RenderShiLianView extends ExtensionClass<GComponentExtend, RenderShiLian>(RenderShiLian) {

    protected override onConstruct(): void {
        super.onConstruct();
        this.BtnEnter.onClick(this, this.dispatch, [ NotifyConst.EnterScene, LogicSceneType.GameScene ]);
    }

    refresh(index: number, showAni: boolean, aniDelay: number) {
        if (showAni) {
            this.alpha = 0;
            this.showAni.play(null, 1, aniDelay);
        }
        this.TxtDesc.text = `极寒冻土&nbsp;[color=#ff0000][size=55]${ index }重天[/size][/color]`;
    }
}