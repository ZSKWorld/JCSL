import { Observer } from "../libs/event/Observer";
import { storage } from "../libs/localStorage/LocalStorage";
import { LocalStorageKey } from "../libs/localStorage/LocalStorageKey";
import { LangCode } from "../table/LangCode";
import { AccountData } from "./AccountData";
import { DataType } from "./Interface";



class PlayerData extends Observer {
	//#region 字段属性
	private _account: AccountData;

	get account() {
		return this._account;
	}

	private secondUpdate() {
	}

	//#endregion
	/**获取数据存储key */
	private getDataKey(type: DataType) {
		return type + "_" + this._account.account + this._account.password;
	}

	/**登录，dev平台专用 */
	loginData(account: string, password: string) {
		const accountKey = "_" + account;
		const accountData = AccountData.getLocalData(accountKey);
		// if (accountData?.loginning) return LangCode._1021;
		if (accountData) {
			if (accountData.password == password) {
				this._account = accountData;
				storage.set(LocalStorageKey.LastLoginAccount, this._account);
				Laya.timer.loop(1000, this, this.secondUpdate, null, true, true);
				this._account.loginning = true;
				storage.set(accountKey, this._account);
				window.onbeforeunload = () => {
					this._account.loginning = false;
					storage.set(accountKey, this._account);
				};
				return LangCode.None;
			} else return LangCode._1003;
		} else return LangCode._1002;
	}

	/**注册，dev平台专用 */
	register(account: string, password: string, nickName: string) {
		const accountKey = "_" + account;
		const accountData = storage.get<AccountData>(accountKey);
		if (accountData) return LangCode._1001;
		this._account = new AccountData(account, password, nickName)
		storage.set(accountKey, this._account);
		return this.loginData(account, password);
	}

	/**清号，dev平台专用 */
	clear() {
		storage.remove("_" + this._account.account);
		storage.remove(this.getDataKey(DataType.Base));
		storage.remove(this.getDataKey(DataType.Bag));
		this.register(this._account.account, this._account.password, this._account.nickName);
	}
}

export const playerData = new PlayerData();
export type IPlayerData = PlayerData;
windowImmit("playerData", playerData)