/**The class is automatically generated by BatMain.bat , please do not modify */

declare interface ConfigTitleData {
	readonly ID: number;
	/**名字 */
	readonly Name: string;
	/**加成 */
	readonly Addition: AdditionType[];
}

declare interface ConfigTitle extends ReadOnlyObject<ConfigTitleData> {
	/**无名小卒 */
	readonly 101: ConfigTitleData;
	/**大名鼎鼎 */
	readonly 102: ConfigTitleData;
}