import { BaseViewCtrl } from "../../../core/BaseViewCtrl";
import { UIUtility } from "../../../tool/UIUtility";
import { ComGongFaMsg, ComGongFaView } from "../../../view/PkgMain/Coms/ComGongFaView";
import { RenderGongFaView } from "../../../view/PkgMain/Renders/RenderGongFaView";

export interface ComGongFaData{

}

export class ComGongFaCtrl extends BaseViewCtrl<ComGongFaView, ComGongFaData>{

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

    private onListItemRenderer(index:number, item:RenderGongFaView){
        
    }
}