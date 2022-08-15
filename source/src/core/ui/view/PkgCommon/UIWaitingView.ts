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

    override onCreate(): void {

    }

    playWordAni(txt: string) {
        this._txt = txt;
        if(!txt) return;
        this._curIndex = 0;
    }

    updateWordAni(){
        if(!this._txt) return;
        this.TxtInfo.text = this._txt.substring(0, this._curIndex);
        this._curIndex++;
        if(this._curIndex > this._txt.length){
            this._curIndex = 0;
        }
    }

}
