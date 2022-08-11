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

    update(): void {

    }

}

const logger = Logger.Create("JinGangQuan").setEnable(true);

export class JinGangQuan extends WeaponBase {
    private items: JinGangQuanItem[] = [];

    private time: number;

    override onAwake() {
        super.onAwake();
        this._colliderEnable = false;
    }

    override onEnable(): void {
        super.onEnable();
        this.level = 5;
        this.speed = 2;
        this.time = 0;
        this._duration = 3000;
        this._coolDown = 1000;
        this.resetItems();
    }

    update(): void {
        if (this._duration >= 0) {
            this.time += Laya.timer.delta;
            if (this.visible) {
                if (this.time >= this._duration) {
                    this.visible = false;
                    this.time = 0;
                    return;
                }
            } else {
                if (this.time >= this._coolDown) {
                    this.visible = true;
                    this.time = 0;
                }
            }
        }
        this.rotation += this._speed;
    }

    override recover() {
        super.recover();
        this.items.forEach(item => item.recover());
        this.items.length = 0;
    }

    private resetItems() {
        const { items, level, _range } = this;
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