import { IRegister, RegisterInput, RegisterOutput } from "../interface/IRegister";
import { BaseController } from "./BaseController";
export declare class RegisterController extends BaseController implements IRegister {
    register(data: RegisterInput): Promise<RegisterOutput>;
}
