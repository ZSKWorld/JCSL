import { NotifyConst } from '../../core/common/NotifyConst';
import { ResPath } from '../../core/common/ResPath';
import { gameMgr } from '../../core/game/GameMgr';
import { ViewID } from '../../core/ui/core/ViewID';
import { LogicSceneBase } from '../LogicSceneBase';

/**
 *@Author zsk
 *@Date 2022/7/25 21:53
 *@Description
 */

export class LogicSceneGame extends LogicSceneBase {

	protected override getResArray(): string[] {
		return [
			ResPath.Ui_PkgGame
		];
	}

	protected onEnter(): void {
		this.dispatch(NotifyConst.AddView, ViewID.GameMainView);
		gameMgr.start();
	}

	protected onExit(): void {
		gameMgr.exit();
	}

}