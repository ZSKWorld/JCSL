import { Util } from "../utils/Util";

export class UserData {
    public uid: string = Util.CreateUID();
    public nickname: string = "";
    public account: string = "";
    public password: string = "";
    constructor(account:string = "",password:string = ""  ,nickname:string = ""  ) { 
        this.account = String(account);
        this.password = String(password);
        this.nickname = String(nickname);
    }

    initData(data: any) {
        Object.keys(data).forEach(v => this[ v ] = data[ v ]);
    }

    save() {
        Util.saveData(this);
    }
}