import { ResPath } from "../../common/ResPath";
import { Enemy_Fllow } from "../role/Enemy_Fllow";
import { JinGangQuan } from "../weapon/JinGangQuan";
import { GamePoolKey } from "./GameInterface";
import { GameObject } from "./GameObject";
import { GameUtil } from "./GameUtil";

class ObjectFactory {
    constructor() {

    }
    private ObjectMap: { [ key in GamePoolKey ]: { type: new (...args: any) => GameObject, pkg: string, url: string } } = {
        [ GamePoolKey.Enemy_Fllow ]: { type: Enemy_Fllow, pkg: ResPath.PkgCommon, url: "Icon_Book_Lu" },
        [ GamePoolKey.Weapon_JingGangFu ]: { type: JinGangQuan, pkg: ResPath.PkgCommon, url: "" },
    }

    createObject<T extends GameObject>(key: GamePoolKey) {
        const data = this.ObjectMap[ key ];
        let obj = Laya.Pool.createByClass(data.type);
        obj.anchor(0.5, 0.5);
        if (data.url)
            obj.changeSource(GameUtil.getFGUITexture(data.pkg, data.url));
        return obj as T;
    }
}
export const objectFactory = new ObjectFactory();