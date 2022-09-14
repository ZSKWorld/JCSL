/**
 * @Author       : zsk
 * @Date         : 2022-08-05 21:17:13
 * @LastEditors  : zsk
 * @LastEditTime : 2022-08-29 23:19:19
 * @Description  : 全局的UI集合
 */
import { IViewCtrlProxy_Class, IViewCtrl_Class, IView_Class } from "./Interfaces";
import { ViewID } from "./ViewID";
type ReadOnlyView = Readonly<IView_Class> & { readonly [ key in ViewID ]: IView_Class };
type ReadOnlyViewCtrl = Readonly<IViewCtrl_Class> & { readonly [ key in ViewID ]: IViewCtrl_Class };
type ReadOnlyProxy = Readonly<IViewCtrlProxy_Class> & { readonly [ key in ViewID ]: IViewCtrlProxy_Class };
export const ViewClass: ReadOnlyView = {} as any;
export const CtrlClass: ReadOnlyViewCtrl = {} as any;
export const ProxyClass: ReadOnlyProxy = {} as any;