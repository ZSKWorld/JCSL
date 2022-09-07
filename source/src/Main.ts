import { FixEngine } from "./FixEngine";
import GameConfig from "./GameConfig";
import { logicSceneMgr } from './logicScene/LogicSceneMgr';
import { LogicSceneType } from './logicScene/LogicSceneType';
import { LogicSceneGame } from './logicScene/scene/LogicSceneGame';
import { LogicSceneInit } from './logicScene/scene/LogicSceneInit';
import { LogicSceneLogin } from './logicScene/scene/LogicSceneLogin';
import { LogicSceneMain } from './logicScene/scene/LogicSceneMain';

class Main {
	constructor() {
		//根据IDE设置初始化引擎
		if (window[ "Laya3D" ]) Laya3D.init(GameConfig.width, GameConfig.height);
		else Laya.init(GameConfig.width, GameConfig.height, Laya[ "WebGL" ]);
		Laya[ "Physics" ] && Laya[ "Physics" ].enable();
		Laya[ "DebugPanel" ] && Laya[ "DebugPanel" ].enable();
		Laya.stage.scaleMode = GameConfig.scaleMode;
		Laya.stage.screenMode = GameConfig.screenMode;
		Laya.stage.alignV = GameConfig.alignV;
		Laya.stage.alignH = GameConfig.alignH;
		//兼容微信不支持加载scene后缀场景
		Laya.URL.exportSceneToJson = GameConfig.exportSceneToJson;

		//打开调试面板（通过IDE设置调试模式，或者url地址增加debug=true参数，均可打开调试面板）
		if (GameConfig.debug || Laya.Utils.getQueryString("debug") == "true") Laya.enableDebugPanel();
		if (GameConfig.physicsDebug && Laya[ "PhysicsDebugDraw" ]) Laya[ "PhysicsDebugDraw" ].enable();
		if (GameConfig.stat) Laya.Stat.show();
		// Laya.alertGlobalError(true);

		fairygui.UIConfig.packageFileExtension = "zip";

		// const font = "Font01";
		// const font = "Font02";
		const font = "Font03";
		// const font = "Font04";
		// const font = "Font05";
		// const font = "Font06";
		// const font = "Font07";
		// const font = "Font08";
		// const font = "Font09";
		// const font = "Font10";
		// const font = "Font11";
		// const font = "Font12";
		// const font = "Font13";
		// const font = "Font14";
		fairygui.UIConfig.defaultFont = font;
		Laya.Text.defaultFont = font;
		FixEngine.Fix();

		//激活资源版本控制，version.json由IDE发布功能自动生成，如果没有也不影响后续流程
		Laya.ResourceVersion.enable("version.json", Laya.Handler.create(this, this.onVersionLoaded), Laya.ResourceVersion.FILENAME_VERSION);
	}

	onVersionLoaded(): void {
		//激活大小图映射，加载小图的时候，如果发现小图在大图合集里面，则优先加载大图合集，而不是小图
		Laya.AtlasInfoManager.enable("fileconfig.json", Laya.Handler.create(this, this.onConfigLoaded));
	}

	onConfigLoaded() {
		logicSceneMgr.init([
			[ LogicSceneType.InitScene, new LogicSceneInit() ],
			[ LogicSceneType.LoginScene, new LogicSceneLogin() ],
			[ LogicSceneType.MainScene, new LogicSceneMain() ],
			[ LogicSceneType.GameScene, new LogicSceneGame() ],
		]);
		logicSceneMgr.enterScene(LogicSceneType.InitScene);
	}

}

//激活启动类
new Main();


