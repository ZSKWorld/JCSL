import { Observer } from "../libs/event/Observer";



class UserData extends Observer {
}

export const userData = new UserData();
export type IUserData = UserData;
windowImmit("userData", userData)