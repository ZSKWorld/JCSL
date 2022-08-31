import { ResPath } from "../common/ResPath";
import { Observer } from "../libs/event/Observer";
import { Logger } from "../libs/utils/Logger";
import { Layer, layerMgr } from "../ui/core/GameLayer";
import { GamePoolKey } from "./core/GameInterface";
import { GameObject } from "./core/GameObject";
import { GameUtil } from "./core/GameUtil";
import { objectFactory } from "./core/ObjectFactory";
import { TriggerHelper } from "./core/TriggerHelper";
import { MovementBase } from "./moveController/MovementBase";
import { player } from "./role/Player";

const logger = Logger.Create("GameMgr").setEnable(true);

const enum GameState {
    /**游戏运行中 */
    Running,
    /**游戏暂停 */
    Pause,
    /**游戏结束 */
    Over,
}

class GameMgr extends Observer {
    private container: Laya.Sprite;
    private _state: GameState = GameState.Over;

    get state() { return this._state; }

    start(): void {
        if (!this.container) {
            this.container = new Laya.Sprite();
            layerMgr.addLayaObject(this.container, Layer.Game);
        }
        player.changeSource(GameUtil.getFGUITexture(ResPath.PkgCommon, "Bg_XingXing02"));
        player.pos(Laya.stage.width / 2, Laya.stage.height / 2);
        this.container.addChild(player);
        player.addWeapon(objectFactory.createObject(GamePoolKey.Weapon_JingGangFu));

        for (let i = 0; i < 10; i++) {
            const enemy = objectFactory.createObject(GamePoolKey.Enemy_Fllow);
            i == 0 && enemy.changeSource(GameUtil.getFGUITexture(ResPath.PkgCommon, "Icon_Book_Yue"));
            enemy.pos(Math.random() * Laya.stage.width, Math.random() * Laya.stage.height);
            this.container.addChild(enemy);
        }

        this._state = GameState.Running;
        Laya.timer.frameLoop(1, this, this.update);
        Laya.stage.on(Laya.Event.KEY_UP, this,(e:Laya.Event)=>{
            if(e.keyCode == Laya.Keyboard.SPACE){
                if(this._state == GameState.Running) this.pause();
                else if(this._state == GameState.Pause) this.resume();
            }
        })
    }

    pause(): void {
        this._state = GameState.Pause;
    }

    resume(): void {
        this._state = GameState.Running;
    }

    exit(): void {
        this._state = GameState.Over;
        Laya.timer.clearAll(this);
        for (const value of GameObject.instances.values()) {
            value.forEach(obj => obj.recover());
        }
        Laya.stage.offAllCaller(this);
    }

    private update(): void {
        if (this._state == GameState.Running) {
            TriggerHelper.checkTrigger();

            for (const value of MovementBase.instances.values()) {
                value.forEach(obj => obj.update());
            }
        }
    }
}

export const gameMgr = new GameMgr();