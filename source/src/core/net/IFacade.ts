import { IHeart } from "./network/IHeart";
import { ILogin } from "./network/ILogin";
import { IRegister } from "./network/IRegister";

export type IFacade =IHeart & IRegister & ILogin;