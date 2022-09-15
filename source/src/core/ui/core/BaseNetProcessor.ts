import { Notifier } from "../../libs/event/Notifier";
import { Logger } from "../../libs/utils/Logger";
import { IViewCtrl } from "./Interfaces";

const logger = Logger.Create("BaseNetProcessor").setEnable(true);

/**
 * @Author       : zsk
 * @Date         : 2022-08-25 23:48:24
 * @LastEditors  : zsk
 * @LastEditTime : 2022-09-15 23:43:30
 * @Description  : 控制器网络回包处理器
 */
export abstract class BaseNetProcessor<T extends IViewCtrl = IViewCtrl> extends Notifier {
    /** 代理的控制器，只读 */
    viewCtrl: T;

    sendMessage(type: string, data?: any): void {
        this.viewCtrl.listener.event(type, data);
    }
}