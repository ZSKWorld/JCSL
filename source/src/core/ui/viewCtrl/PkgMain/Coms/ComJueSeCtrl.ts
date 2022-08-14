import { BaseViewCtrl } from "../../../core/BaseViewCtrl";
import { UIUtility } from "../../../tool/UIUtility";
import { ComJueSeMsg, ComJueSeView } from "../../../view/PkgMain/Coms/ComJueSeView";
import { RenderJueSeView } from "../../../view/PkgMain/Renders/RenderJueSeView";

export interface ComJueSeData{

}

export class ComJueSeCtrl extends BaseViewCtrl<ComJueSeView, ComJueSeData>{

    override onAwake(): void {
        super.onAwake();
        UIUtility.SetList(this.view.ListRole, 50, this, this.onListRoleRenderer);
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

    private onListRoleRenderer(index:number, item:RenderJueSeView){
        
    }
}