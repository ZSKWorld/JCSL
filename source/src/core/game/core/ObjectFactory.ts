import { ResPath } from "../../common/ResPath";
import { MovementBase } from "../moveController/MovementBase";
import { Movement_FollowPlayer } from "../moveController/Movement_FollowPlayer";
import { Movement_Rotate } from "../moveController/Movement_Rotate";
import { EnemyNormal } from "../role/EnemyNormal";
import { JinGangQuan } from "../weapon/JinGangQuan";
import { GamePoolKey } from "./GameInterface";
import { GameObject } from "./GameObject";
import { GameUtil } from "./GameUtil";
type ObjectMapType = { [ key in GamePoolKey ]: { type: Class<GameObject>, moveCtrl: Class<MovementBase>, pkg: string, url: string } };
class ObjectFactory {
    constructor() {

    }
    private _objectMap: ObjectMapType = {
        [ GamePoolKey.Enemy_Fllow ]: { type: EnemyNormal, moveCtrl: Movement_FollowPlayer, pkg: ResPath.PkgCommon, url: "Icon_Book_Lu" },
        [ GamePoolKey.Weapon_JingGangFu ]: { type: JinGangQuan, moveCtrl: Movement_Rotate, pkg: ResPath.PkgCommon, url: "" },
    }

    createObject<T extends GameObject>(key: GamePoolKey) {
        const data = this._objectMap[ key ];
        let obj = Laya.Pool.createByClass(data.type);
        obj.anchor(0.5, 0.5);
        if (data.url) obj.changeSource(GameUtil.getFGUITexture(data.pkg, data.url));
        if (data.moveCtrl && !obj.moveCtrl) obj.moveCtrl = Laya.Pool.createByClass(data.moveCtrl);
        return obj as T;
    }
}
export const objectFactory = new ObjectFactory();