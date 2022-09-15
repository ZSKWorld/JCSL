import { BaseViewCtrl } from "../../../core/BaseViewCtrl";
import { UIUtility } from "../../../tool/UIUtility";
import { ComShiLianView } from "../../../view/PkgMain/Coms/ComShiLianView";
import { RenderShiLianView } from "../../../view/PkgMain/Renders/RenderShiLianView";

export interface ComShiLianData {

}

export class ComShiLianCtrl extends BaseViewCtrl<ComShiLianView, ComShiLianData>{
    private _showAni: boolean;
    private _firstItem: number;

    override onAwake(): void {
        
    }

    override onEnable(): void {
        this._showAni = true;
        this._firstItem = -1;
        UIUtility.SetList(this.view.ListItem, 10, this, this.onListItemRenderer);
        this._showAni = false;
    }

    override onDisable(): void {
        
    }

    override onDestroy(): void {
        
    }

    private onListItemRenderer(index: number, item: RenderShiLianView) {
        if(this._firstItem == -1) this._firstItem = index;
        item.refresh(index + 1, this._showAni, Math.max((index - this._firstItem) * 0.05, 0.01));
    }
}