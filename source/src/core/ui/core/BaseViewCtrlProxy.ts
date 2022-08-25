import { Observer } from "../../libs/event/Observer";
import { Logger } from "../../libs/utils/Logger";
import { BaseViewCtrl } from "./BaseViewCtrl";

const logger = Logger.Create("BaseViewCtrlProxy").setEnable(true);

export abstract class BaseViewCtrlProxy<T extends BaseViewCtrl = BaseViewCtrl> extends Observer {
    viewCtrl: T;

    constructor(){
        super();
        logger.log(this["__proto__"].constructor.name);
    }

    sendMessage(type: string, data?: any): void {
        this.viewCtrl.listener.event(type, data);
    }
}