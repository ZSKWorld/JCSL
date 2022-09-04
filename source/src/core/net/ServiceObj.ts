type IFacade = IHeart & IRegister & ILogin;

/**
 * @Author       : zsk
 * @Date         : 2022-08-14 22:15:50
 * @LastEditors  : zsk
 * @LastEditTime : 2022-09-04 20:42:45
 * @Description  : 
 */
export class ServiceObj implements IFacade {
    heart(data: HeartInput): void {
        throw new Error("Method not implemented.");
    }
    register(data: RegisterInput): void {
        throw new Error("Method not implemented.");
    }
    login(data: LoginInput): void {
        throw new Error("Method not implemented.");
    }

    static get Objs() {
        const obj = {};
        const names = Object.getOwnPropertyNames(this.prototype);
        names.forEach(v => obj[ v ] = null);
        return obj;
    }
}