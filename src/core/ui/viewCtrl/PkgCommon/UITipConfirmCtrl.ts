import { Logger } from "../../../libs/utils/Logger";
import { BaseViewCtrl } from "../../core/BaseViewCtrl";
import { UITipConfirmMsg, UITipConfirmView } from "../../view/PkgCommon/UITipConfirmView";

export interface UITipConfirmData {
    text: string;
    title?: string;
    callback?: Function;
}
const logger = Logger.Create("UITipConfirmCtrl").setEnable(true);
export class UITipConfirmCtrl extends BaseViewCtrl<UITipConfirmView, UITipConfirmData>{
    private confirmDatas: UITipConfirmData[] = [];
    private curConfirm: UITipConfirmData;

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
        if(this.curConfirm) this.confirmDatas.unshift(this.curConfirm);
        this.confirmDatas.unshift(this.data);
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
        this.curConfirm = this.confirmDatas.shift();
        if (this.curConfirm) this.view.setContent(this.curConfirm.text, this.curConfirm.title);
        else this.view.playAni(true).then(() => this.removeSelf());
    }

    private onBtnCloseClick(result: boolean, e: Laya.Event) {
        this.curConfirm.callback?.(result);
        this.showConfirm();
    }
}