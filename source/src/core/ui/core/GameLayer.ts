/** UI层级 */
export enum Layer {
    Game = "Game",
    Bottom = "Bottom",
    Middle = "Middle",
    Top = "Top",
    Dialog = "Dialog",
    Alert = "Alert",
    Lock = "Lock",
}

/**
 * @Author       : zsk
 * @Date         : 2022-08-05 21:17:13
 * @LastEditors  : zsk
 * @LastEditTime : 2022-08-29 01:15:37
 * @Description  : UI层级管理
 */
class LayerManager {
    private _layerMap: { [ key in Layer ]: fgui.GComponent };

    init() {
        if (this._layerMap) return;
        this._layerMap = {} as any;
        const gRoot = fgui.GRoot.inst;
        Laya.stage.addChild(gRoot.displayObject);

        for (const key in Layer) {
            if (Object.prototype.hasOwnProperty.call(Layer, key)) {
                const layer = new fgui.GComponent();
                layer.name = Layer[ key ];
                gRoot.addChild(layer);
                this._layerMap[ layer.name ] = layer;
                layer.displayObject.mouseThrough = true;
                layer.displayObject.mouseEnabled = true;
                layer.makeFullScreen();
            }
        }
    }

    addObject(obj: fgui.GObject, layer: Layer, index?: number) {
        if (!obj || obj.isDisposed || !this._layerMap[ layer ]) return;
        index = index ?? this._layerMap[ layer ].numChildren;
        this._layerMap[ layer ].addChild(obj);
    }

    addLayaObject(obj: Laya.Sprite, layer: Layer, index?: number) {
        if (!obj || obj.destroyed || !this._layerMap[ layer ]) return;
        index = index ?? this._layerMap[ layer ].numChildren;
        this._layerMap[ layer ].displayObject.addChildAt(obj, index);
    }

}
export const layerMgr = new LayerManager();
