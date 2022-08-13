import { Logger } from "../../libs/utils/Logger";
import { EnemyBase } from "./EnemyBase";

const logger = Logger.Create("PlayerController").setEnable(true);

export class EnemyNormal extends EnemyBase {
    protected onHurt(hurt: number): void {
        
    }
    protected onDead(): void {
        
    }
    
    
}