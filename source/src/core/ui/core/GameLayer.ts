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
    private layerMap: { [ key in Layer ]: fgui.GComponent };

    init() {
        if (this.layerMap) return;
        this.layerMap = {} as any;
        const gRoot = fgui.GRoot.inst;
        Laya.stage.addChild(gRoot.displayObject);

        for (const key in Layer) {
            if (Object.prototype.hasOwnProperty.call(Layer, key)) {
                const layer = new fgui.GComponent();
                layer.name = Layer[ key ];
                gRoot.addChild(layer);
                this.layerMap[ layer.name ] = layer;
                layer.displayObject.mouseThrough = true;
                layer.displayObject.mouseEnabled = true;
                layer.makeFullScreen();
            }
        }
    }

    addObject(obj: fgui.GObject, layer: Layer, index?: number) {
        if (!obj || obj.isDisposed || !this.layerMap[ layer ]) return;
        index = index ?? this.layerMap[ layer ].numChildren;
        this.layerMap[ layer ].addChild(obj);
    }

    addLayaObject(obj: Laya.Sprite, layer: Layer, index?: number) {
        if (!obj || obj.destroyed || !this.layerMap[ layer ]) return;
        index = index ?? this.layerMap[ layer ].numChildren;
        this.layerMap[ layer ].displayObject.addChildAt(obj, index);
    }

}
export const layerMgr = new LayerManager();
