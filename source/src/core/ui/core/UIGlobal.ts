/**
 * @Author       : zsk
 * @Date         : 2022-08-05 21:17:13
 * @LastEditors  : zsk
 * @LastEditTime : 2022-09-15 23:40:36
 * @Description  : 全局的UI集合
 */
import { INetProcessor_Class, IViewCtrl_Class, IView_Class } from "./Interfaces";
import { ViewID } from "./ViewID";
type ReadOnlyView = Readonly<IView_Class> & { readonly [ key in ViewID ]: IView_Class };
type ReadOnlyViewCtrl = Readonly<IViewCtrl_Class> & { readonly [ key in ViewID ]: IViewCtrl_Class };
type ReadOnlyNetProcessor = Readonly<INetProcessor_Class> & { readonly [ key in ViewID ]: INetProcessor_Class };
export const ViewClass: ReadOnlyView = {} as any;
export const CtrlClass: ReadOnlyViewCtrl = {} as any;
export const NetProcessorClass: ReadOnlyNetProcessor = {} as any;