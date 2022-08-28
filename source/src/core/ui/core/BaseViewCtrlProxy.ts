import { Observer } from "../../libs/event/Observer";
import { Logger } from "../../libs/utils/Logger";
import { BaseViewCtrl } from "./BaseViewCtrl";

const logger = Logger.Create("BaseViewCtrlProxy").setEnable(true);

/**页面控制器代理，主要处理网络回包事件 */
export abstract class BaseViewCtrlProxy<T extends BaseViewCtrl = BaseViewCtrl> extends Observer {
    viewCtrl: T;

    sendMessage(type: string, data?: any): void {
        this.viewCtrl.listener.event(type, data);
    }
}