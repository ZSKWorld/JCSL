/**The script is automatically generated by BatMain.bat , please do not modify */
import { ResPath } from "../common/ResPath";

class TableManager {
	/**固定文本表 */
	readonly Lang: ConfigLang;
	/**常量表 */
	readonly Const: ConfigConst;
	/**颜色表 */
	readonly Color: ConfigColor;

    loadTable() {
		let tableData = Laya.loader.getRes(ResPath.Table_Config);
		if (tableData) {
			const keyMap = tableData.keyMap;
			delete tableData.keyMap;
			for (const tableKey in tableData) {
				const data = tableData[ tableKey ];
				Object.keys(data).forEach(dataKey => this.decodeData(data[ dataKey ], keyMap));
				this[ tableKey ] = data;
			}
			Laya.loader.clearRes(ResPath.Table_Config);
		}
	}

	private decodeData(data: any, keyMap: any) {
		if (data == null) return;
		if (typeof data != "object") return;
		Object.keys(data).forEach((key) => {
			const temp = data[ key ];
			const type = temp?.constructor?.name;
			if (type == "Object")
				this.decodeData(temp, keyMap);
			else if (type == "Array")
				temp.forEach((v: any) => this.decodeData(v, keyMap));
			data[ keyMap[ key ] ] = temp;
			delete data[ key ];
		});
	}
}
export const tableMgr = new TableManager();
windowImmit("tableMgr", tableMgr);