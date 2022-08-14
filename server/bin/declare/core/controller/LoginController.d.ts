import { ILogin, LoginInput, LoginOutput } from "../interface/ILogin";
import { BaseController } from "./BaseController";
export declare class LoginController extends BaseController implements ILogin {
    login(data: LoginInput): Promise<LoginOutput>;
}
