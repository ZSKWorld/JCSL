import { Logger } from "../../../libs/utils/Logger";
import { BaseViewCtrl } from "../../core/BaseViewCtrl";
import { UITipConfirmMsg, UITipConfirmView } from "../../view/PkgCommon/UITipConfirmView";

export interface UITipConfirmData {
    text: string;
    title?: string;
    callback?: Laya.Handler;
}

const logger = Logger.Create("UITipConfirmCtrl").setEnable(true);

export class UITipConfirmCtrl extends BaseViewCtrl<UITipConfirmView, UITipConfirmData>{
    private _confirmDatas: UITipConfirmData[] = [];
    private _curConfirm: UITipConfirmData;

    override onAwake(): void {
        super.onAwake();
        this.addMessageListener(UITipConfirmMsg.OnBtnBgClick, this.onBtnCloseClick, [ false ]);
        this.addMessageListener(UITipConfirmMsg.OnBtnConfirmClick, this.onBtnCloseClick, [ true ]);
    }

    override onEnable(): void {
        super.onEnable();
        this.view.playAni();
    }

    override onForeground(): void {
        if (this._curConfirm) this._confirmDatas.unshift(this._curConfirm);
        this._confirmDatas.unshift(this.data);
        this.data = null;
        this.showConfirm();
    }

    override onDisable(): void {
        super.onDisable();
    }

    override onDestroy(): void {
        super.onDestroy();
    }

    private showConfirm() {
        this._curConfirm = this._confirmDatas.shift();
        if (this._curConfirm) this.view.setContent(this._curConfirm.text, this._curConfirm.title);
        else this.view.playAni(true).then(() => this.removeSelf());
    }

    private onBtnCloseClick(result: boolean) {
        this._curConfirm.callback?.runWith(result);
        this.showConfirm();
    }
}