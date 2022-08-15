import { IFacade } from "./IFacade";
import { LoginInput } from "./network/ILogin";
import { RegisterInput } from "./network/IRegister";

export class ServiceObj implements IFacade {
    login(data: LoginInput): void {
        throw new Error("Method not implemented.");
    }
    register(data: RegisterInput): void {
        throw new Error("Method not implemented.");
    }

    static get Objs() {
        const obj = {};
        const names = Object.getOwnPropertyNames(this.prototype);
        names.forEach(v => obj[ v ] = null);
        return obj;
    }
}