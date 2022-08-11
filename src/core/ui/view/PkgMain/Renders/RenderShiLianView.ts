import { LogicSceneType } from "../../../../../logicScene/LogicSceneType";
import { NotifyConst } from "../../../../common/NotifyConst";
import { INotifier } from "../../../../libs/event/Notifier";
import { ExtensionClass } from "../../../../libs/utils/Util";
import RenderShiLian from "../../../ui/PkgMain/RenderShiLian";

export class RenderShiLianView extends ExtensionClass<INotifier, RenderShiLian>(RenderShiLian) {

    protected override onConstruct(): void {
        super.onConstruct();
        this.BtnEnter.onClick(this, this.onBtnEnterClick);
    }

    private onBtnEnterClick() {
        this.dispatch(NotifyConst.EnterScene, LogicSceneType.GameScene);
    }

}