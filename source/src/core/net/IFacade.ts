/**
 * @Author       : zsk
 * @Date         : 2022-08-25 23:18:35
 * @LastEditors  : zsk
 * @LastEditTime : 2022-08-29 21:34:27
 * @Description  : 
 */

import { IHeart } from "./network/IHeart";
import { ILogin } from "./network/ILogin";
import { IRegister } from "./network/IRegister";

export type IFacade = IHeart & IRegister & ILogin;