import { MovementBase } from "./MovementBase";

export class Movement_Rotate extends MovementBase {
    protected override onEnable(){
        this.speedOrigin = 2;
    }

    protected override onUpdate(){
        this.owner.rotation += this.speed;
    }
}