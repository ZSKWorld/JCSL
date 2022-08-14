import { Util } from "../../utils/Util";
import { ErrorCode } from "../ErrorCode";
import { ILogin, LoginInput, LoginOutput } from "../interface/ILogin";
import { AddCMD, BaseController } from "./BaseController";

export class LoginController extends BaseController implements ILogin {
    @AddCMD
    login(data: LoginInput) {
        return new Promise<LoginOutput>((resolve, reject) => {
            const userData = Util.getData(data.account, data.password);
            if (!userData) this.response(data.cmd, null, ErrorCode.USER_NOT_EXIST);
            else {
                this.connection.userLogin(userData);
                this.response(data.cmd, userData);
            }
            resolve(null);
        });
    }
}