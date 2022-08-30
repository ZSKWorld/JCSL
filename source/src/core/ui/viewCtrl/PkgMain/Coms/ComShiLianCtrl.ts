import { BaseViewCtrl } from "../../../core/BaseViewCtrl";
import { UIUtility } from "../../../tool/UIUtility";
import { ComShiLianView } from "../../../view/PkgMain/Coms/ComShiLianView";
import { RenderShiLianView } from "../../../view/PkgMain/Renders/RenderShiLianView";

export interface ComShiLianData {

}

export class ComShiLianCtrl extends BaseViewCtrl<ComShiLianView, ComShiLianData>{

    override onAwake(): void {
        super.onAwake();
        UIUtility.SetList(this.view.ListItem, 10, this, this.onListItemRenderer);
    }

    override onEnable(): void {
        super.onEnable();
    }


    override onDisable(): void {
        super.onDisable();
    }

    override onDestroy(): void {
        super.onDestroy();
    }

    private onListItemRenderer(index: number, item: RenderShiLianView) {

    }
}