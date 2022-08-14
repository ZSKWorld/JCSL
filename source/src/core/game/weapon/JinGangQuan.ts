import { ResPath } from "../../common/ResPath";
import { Logger } from "../../libs/utils/Logger";
import { GameUtil } from "../core/GameUtil";
import { WeaponBase } from "./WeaponBase";
class JinGangQuanItem extends WeaponBase {
    constructor(skin?: string | Laya.Texture) {
        super(skin);
        this.anchor(0.5, 0.5);
        this.changeSource(GameUtil.getFGUITexture(ResPath.PkgCommon, "Btn_Xingxi"));
    }
}

const logger = Logger.Create("JinGangQuan").setEnable(true);

export class JinGangQuan extends WeaponBase {
    private _items: JinGangQuanItem[] = [];

    private _time: number;

    override onAwake() {
        super.onAwake();
        this._colliderEnable = false;
    }

    override onEnable(): void {
        super.onEnable();
        this._level = 5;
        this._time = 0;
        this._duration = 3000;
        this._coolDown = 1000;
        this.resetItems();
    }

    override recover() {
        super.recover();
        this._items.forEach(item => item.recover());
        this._items.length = 0;
        this.visible = true;
    }

    protected override onUpdate(): void {
        if (this._duration >= 0) {
            this._time += Laya.timer.delta;
            if (this.visible) {
                if (this._time >= this._duration) {
                    this.visible = false;
                    this._time = 0;
                    return;
                }
            } else {
                if (this._time >= this._coolDown) {
                    this.visible = true;
                    this._time = 0;
                }
            }
        }
    }

    private resetItems() {
        const { _items: items, level, _range } = this;
        const itemCount = items.length;
        if (itemCount < level) {
            for (let i = level - itemCount; i > 0; i--) {
                let item = Laya.Pool.createByClass(JinGangQuanItem);
                items.push(item);
            }
        } else if (itemCount > level) {
            for (let i = itemCount - level; i > 0; i--) {
                items.pop().recover();
            }
        }

        const radius = _range * 100;
        const unitAngle = 360 / level;
        const radian = Math.PI / 180;
        for (let i = 0; i < level; i++) {
            const item = items[ i ];
            if (item.parent != this) this.addChild(item);
            item.pos(Math.cos(i * unitAngle * radian) * radius, Math.sin(i * unitAngle * radian) * radius, true);
        }
    }
}