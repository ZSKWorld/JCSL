import { Util } from "../../utils/Util";
import { ErrorCode } from "../ErrorCode";
import { ILogin, LoginInput } from "../interface/ILogin";
import { AddCMD, BaseController } from "./BaseController";

export class LoginController extends BaseController implements ILogin {
    @AddCMD
    login(data: LoginInput): void {
        let userData = Util.getData(data.account, data.password);
        if (!userData) this.response(data.cmd, null, ErrorCode.USER_NOT_EXIST);
        else {
            this.connection.userLogin(userData);
            userData = JSON.parse(JSON.stringify(this.connection.playerData));
            delete data.password;
            this.response(data.cmd, { userData });
        }
    }
}