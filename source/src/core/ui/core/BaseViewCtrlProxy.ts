import { Notifier } from "../../libs/event/Notifier";
import { Logger } from "../../libs/utils/Logger";
import { IViewCtrl } from "./interfaces";

const logger = Logger.Create("BaseViewCtrlProxy").setEnable(true);

/**
 * @Author       : zsk
 * @Date         : 2022-08-25 23:48:24
 * @LastEditors  : zsk
 * @LastEditTime : 2022-09-14 23:25:55
 * @Description  : 页面控制器代理，主要处理网络回包事件
 */
export abstract class BaseViewCtrlProxy<T extends IViewCtrl = IViewCtrl> extends Notifier {
    /** 代理的控制器，只读 */
    viewCtrl: T;

    sendMessage(type: string, data?: any): void {
        this.viewCtrl.listener.event(type, data);
    }
}