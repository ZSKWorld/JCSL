import { IHeart } from "../interface/IHeart";
import { UserInput, UserOutput } from "../interface/Interface";
import { BaseController } from "./BaseController";

export class HeartController extends BaseController implements IHeart {
    private _intervalId: NodeJS.Timer;
    override onConstruct() {
        super.onConstruct();
        this._intervalId = setInterval(() => this.heart(null), 10000);
    }
    heart(data: HeartInput) {
        this.response("heart", { timeStamp: Date.now() });
    }

    override clear() {
        super.clear();
        clearInterval(this._intervalId);
    }
}

export interface HeartInput extends UserInput {

}

export interface HeartOutput extends UserOutput {
    timeStamp: number;
}