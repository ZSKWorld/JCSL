import { Notifier } from "../../libs/event/Notifier";
import { Logger } from "../../libs/utils/Logger";
import { BaseViewCtrl } from "./BaseViewCtrl";

const logger = Logger.Create("BaseViewCtrlProxy").setEnable(true);

/**
 * @Author       : zsk
 * @Date         : 2022-08-25 23:48:24
 * @LastEditors  : zsk
 * @LastEditTime : 2022-08-29 01:14:33
 * @Description  : 页面控制器代理，主要处理网络回包事件
 */
export abstract class BaseViewCtrlProxy<T extends BaseViewCtrl = BaseViewCtrl> extends Notifier {
    viewCtrl: T;

    sendMessage(type: string, data?: any): void {
        this.viewCtrl.listener.event(type, data);
    }
}