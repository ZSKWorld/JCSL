import { IFacade } from "../network/IFacade";
import { LoginInput, LoginOutput } from "../network/ILogin";
import { RegisterInput, RegisterOutput } from "../network/IRegister";

export class ServiceObj implements IFacade{
    login(data: LoginInput): Promise<LoginOutput> {
        throw new Error("Method not implemented.");
    }
    register(data: RegisterInput): Promise<RegisterOutput> {
        throw new Error("Method not implemented.");
    }

    static get Objs() {
        const obj = {};
        const names = Object.getOwnPropertyNames(this.prototype);
        names.forEach(v => obj[v] = null);
        return obj;
    }
}