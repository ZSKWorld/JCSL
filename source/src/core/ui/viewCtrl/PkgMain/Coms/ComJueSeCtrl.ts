import { BaseViewCtrl } from "../../../core/BaseViewCtrl";
import { UIUtility } from "../../../tool/UIUtility";
import { ComJueSeMsg, ComJueSeView } from "../../../view/PkgMain/Coms/ComJueSeView";
import { RenderJueSeView } from "../../../view/PkgMain/Renders/RenderJueSeView";

export interface ComJueSeData{

}

export class ComJueSeCtrl extends BaseViewCtrl<ComJueSeView, ComJueSeData>{

    override onAwake(): void {
        UIUtility.SetList(this.view.ListRole, 50, this, this.onListRoleRenderer);
    }

    override onEnable(): void {
        
    }


    override onDisable(): void {
        
    }

    override onDestroy(): void {
        
    }

    private onListRoleRenderer(index:number, item:RenderJueSeView){
        
    }
}