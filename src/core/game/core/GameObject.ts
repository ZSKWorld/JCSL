import { Image } from "../../libs/layaUI/Image";
import { Logger } from "../../libs/utils/Logger";
import { Camp, ITrigger, IUpdate } from "./GameInterface";

const logger = Logger.Create("GameObject").setEnable(true);

export abstract class GameObject extends Image implements IUpdate, ITrigger {
    private static GID = 5;
    private static _instance = new Map<string, GameObject[]>();
    static get instances() { return this._instance; }
    private _gid = GameObject.GID++;
    /** 阵营 */
    protected _camp: Camp = Camp.None;
    /** 是否检测碰撞 */
    protected _colliderEnable: boolean = true;
    /** 碰撞半径 */
    private _colliderRadius: number = 0;
    get gid() { return this._gid; }
    get camp() { return this._camp; }
    get colliderEnable() { return this._colliderEnable; }
    get colliderRadius() { return this._colliderRadius; }

    constructor(skin?: string | Laya.Texture) {
        super(skin);
        this.name = this[ "__proto__" ].constructor.name;
        if (GameObject._instance.has(this.name) == false)
            GameObject.instances.set(this.name, []);
        GameObject._instance.get(this.name).push(this)
        this.on(Laya.Event.RESIZE, this, this.onResize);
    }

    override onAwake() {
        this.onResize();
    }

    onTriggerEnter(other: GameObject): void {

    }

    onTriggerStay(other: GameObject): void {

    }

    onTriggerExit(other: GameObject): void {

    }

    recover() {
        this.removeSelf();
        Laya.Pool.recoverByClass(this);
    }

    protected onResize() {
        this._colliderRadius = Math.min(this.width, this.height) / 2;
    }

    abstract update(): void;
}
windowImmit("GameObject", GameObject);