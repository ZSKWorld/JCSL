import { ResPath } from "../../../common/ResPath";
import { ExtensionClass } from "../../../libs/utils/Util";
import { ViewExtension } from "../../core/interfaces";
import UIWaiting from "../../ui/PkgCommon/UIWaiting";

export const enum UIWaitingMsg {

}

export class UIWaitingView extends ExtensionClass<ViewExtension, UIWaiting>(UIWaiting) {
    static PkgRes = ResPath.Ui_PkgCommon;
    static DontDestroy: boolean = true;
    private _txt: string;
    private _curIndex: number;
    private _speed:number;

    override onCreate(): void {

    }

    playWordAni(txt: string) {
        this._txt = txt;
        if(!txt) return;
        this._curIndex = 0;
        this.TxtInfo.text = txt;
        this._speed = 100;
    }

    updateWordAni(){
        if(!this._txt) return;
        if(--this._speed > 0) return;
        this._speed = 20;
        this.TxtInfo.text = this._txt.substring(0, this._curIndex);
        this._curIndex++;
        if(this._curIndex > this._txt.length){
            this._curIndex = 1;
            this._speed = 100;
        }
    }

}
