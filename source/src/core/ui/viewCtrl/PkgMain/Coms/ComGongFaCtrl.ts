import { BaseViewCtrl } from "../../../core/BaseViewCtrl";
import { UIUtility } from "../../../tool/UIUtility";
import { ComGongFaMsg, ComGongFaView } from "../../../view/PkgMain/Coms/ComGongFaView";
import { RenderGongFaView } from "../../../view/PkgMain/Renders/RenderGongFaView";

export interface ComGongFaData{

}

export class ComGongFaCtrl extends BaseViewCtrl<ComGongFaView, ComGongFaData>{

    override onAwake(): void {
        UIUtility.SetList(this.view.ListItem, 10, this, this.onListItemRenderer);
    }

    override onEnable(): void {
        
    }


    override onDisable(): void {
        
    }

    override onDestroy(): void {
        
    }

    private onListItemRenderer(index:number, item:RenderGongFaView){
        
    }
}