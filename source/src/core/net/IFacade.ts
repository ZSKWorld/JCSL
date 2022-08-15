import { ILogin } from "./network/ILogin";
import { IRegister } from "./network/IRegister";

export type IFacade = ILogin & IRegister;