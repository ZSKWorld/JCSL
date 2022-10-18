import { NotifyConst } from "../../../common/NotifyConst";
import { InsertNotify } from "../../../libs/event/EventMgr";
import { BaseViewCtrl } from "../../core/BaseViewCtrl";
import { UIWaitingView } from "../../view/PkgCommon/UIWaitingView";

export class UIWaitingCtrl extends BaseViewCtrl<UIWaitingView, string>{
    private _curIndex: number;
    private _speed: number;

    override onAwake(): void {

    }

    override onEnable(): void {
    }

    override onForeground() {
        if (!this.data) this.data = "请稍后...";
        this._curIndex = 0;
        this._speed = 100;
        this.view.refreshText(this.data);
    }

    override onUpdate(): void {
        if (--this._speed > 0) return;
        this._speed = 20;
        this.view.refreshText(this.data.substring(0, this._curIndex));
        this._curIndex++;
        if (this._curIndex > this.data.length) {
            this._curIndex = 1;
            this._speed = 100;
        }
    }

    override onDisable(): void {

    }

    override onDestroy(): void {

    }

    @InsertNotify(NotifyConst.SocketClosed, false, [ "网络已断开" ])
    private show(data: string) {
        if (this.isShow == false)
            this.addView(this.viewId, data, null, false);
    }

    @InsertNotify(NotifyConst.SocketOpened)
    private hide() {
        this.removeSelf();
    }
}