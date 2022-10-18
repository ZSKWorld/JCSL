import { LogicSceneType } from "../../../../../logicScene/LogicSceneType";
import { NotifyConst } from "../../../../common/NotifyConst";
import { BaseViewCtrl, InsertKeyEvent, KeyEvent } from "../../../core/BaseViewCtrl";
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

    @InsertKeyEvent(KeyEvent.KeyUp, Laya.Keyboard.ESCAPE)
    private test(){
        this.dispatch(NotifyConst.EnterScene, LogicSceneType.InitScene);
    }
}