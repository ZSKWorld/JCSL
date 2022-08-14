import { UIEvent } from "./UIEvent";
import { UIUtils } from "./UIUtils";
import { Widget } from "./Widget";

export class UIComponent extends Laya.Sprite {
    private _anchorX: number = NaN;
    private _anchorY: number = NaN;
    private _widget:Widget = Widget.EMPTY;
    public _dataSource:any;
    private _tag:any;
    private _toolTip:any;
    private _gray:boolean;
    private _disabled:boolean;

    constructor(createChildren = true) {
        super();
        if (createChildren) {
            this.preinitialize();
            this.createChildren();
            this.initialize();
        }
    }
    override destroy(destroyChild = true) {
        super.destroy(destroyChild);
        this._dataSource = null;
        this._tag = null;
        this._toolTip = null;
    }
    preinitialize() {
    }
    createChildren() {
    }
    initialize() {
    }
    override get width() {
        return this.get_width();
    }
    override get_width() {
        if (this["_width"])
            return this["_width"];
        return this.measureWidth();
    }
    measureWidth() {
        let max = 0;
        this.commitMeasure();
        for (let i = this.numChildren - 1; i > -1; i--) {
            const comp = this.getChildAt(i) as Laya.Sprite;
            if (comp["_visible"]) {
                max = Math.max(comp["_x"] + comp.width * comp.scaleX, max);
            }
        }
        return max;
    }
    commitMeasure() {
    }
    override get height() {
        return this.get_height();
    }
    override get_height() {
        if (this["_height"])
            return this["_height"];
        return this.measureHeight();
    }
    measureHeight() {
        let max = 0;
        this.commitMeasure();
        for (let i = this.numChildren - 1; i > -1; i--) {
            const comp = this.getChildAt(i) as Laya.Sprite;
            if (comp["_visible"]) {
                max = Math.max(comp["_y"] + comp.height * comp.scaleY, max);
            }
        }
        return max;
    }
    get dataSource() {
        return this.get_dataSource();
    }
    get_dataSource() {
        return this._dataSource;
    }
    set dataSource(value) {
        this.set_dataSource(value);
    }
    set_dataSource(value) {
        this._dataSource = value;
        for (var prop in this._dataSource) {
            if (prop in this && !(typeof (this[ prop ]) == 'function')) {
                this[ prop ] = this._dataSource[ prop ];
            }
        }
    }
    get top() {
        return this.get_top();
    }
    get_top() {
        return this._widget.top;
    }
    set top(value) {
        this.set_top(value);
    }
    set_top(value) {
        if (value != this._widget.top) {
            this._getWidget().top = value;
        }
    }
    get bottom() {
        return this.get_bottom();
    }
    get_bottom() {
        return this._widget.bottom;
    }
    set bottom(value) {
        this.set_bottom(value);
    }
    set_bottom(value) {
        if (value != this._widget.bottom) {
            this._getWidget().bottom = value;
        }
    }
    get left() {
        return this._widget.left;
    }
    set left(value) {
        if (value != this._widget.left) {
            this._getWidget().left = value;
        }
    }
    get right() {
        return this._widget.right;
    }
    set right(value) {
        if (value != this._widget.right) {
            this._getWidget().right = value;
        }
    }
    get centerX() {
        return this._widget.centerX;
    }
    set centerX(value) {
        if (value != this._widget.centerX) {
            this._getWidget().centerX = value;
        }
    }
    get centerY() {
        return this._widget.centerY;
    }
    set centerY(value) {
        if (value != this._widget.centerY) {
            this._getWidget().centerY = value;
        }
    }
    _sizeChanged() {
        if (!isNaN(this._anchorX))
            this.pivotX = this.anchorX * this.width;
        if (!isNaN(this._anchorY))
            this.pivotY = this.anchorY * this.height;
        this.event(Laya.Event.RESIZE);
        if (this._widget !== Widget.EMPTY)
            this._widget.resetLayout();
    }
    get tag() {
        return this._tag;
    }
    set tag(value) {
        this._tag = value;
    }
    get toolTip() {
        return this._toolTip;
    }
    set toolTip(value) {
        if (this._toolTip != value) {
            this._toolTip = value;
            if (value != null) {
                this.on(Laya.Event.MOUSE_OVER, this, this.onMouseOver);
                this.on(Laya.Event.MOUSE_OUT, this, this.onMouseOut);
            }
            else {
                this.off(Laya.Event.MOUSE_OVER, this, this.onMouseOver);
                this.off(Laya.Event.MOUSE_OUT, this, this.onMouseOut);
            }
        }
    }
    onMouseOver(e) {
        Laya.stage.event(UIEvent.SHOW_TIP, this._toolTip);
    }
    onMouseOut(e) {
        Laya.stage.event(UIEvent.HIDE_TIP, this._toolTip);
    }
    get gray() {
        return this._gray;
    }
    set gray(value) {
        if (value !== this._gray) {
            this._gray = value;
            UIUtils.gray(this, value);
        }
    }
    get disabled() {
        return this._disabled;
    }
    set disabled(value) {
        if (value !== this._disabled) {
            this.gray = this._disabled = value;
            this.mouseEnabled = !value;
        }
    }
    _getWidget() {
        this._widget === Widget.EMPTY && (this._widget = this.addComponent(Widget));
        return this._widget;
    }
    override set scaleX(value) {
        this.set_scaleX(value);
    }
    override set_scaleX(value) {
        if (super.get_scaleX() == value)
            return;
        super.set_scaleX(value);
        this.callLater(this._sizeChanged);
    }
    override get scaleX() {
        return super.scaleX;
    }
    override set scaleY(value) {
        this.set_scaleY(value);
    }
    override set_scaleY(value) {
        if (super.get_scaleY() == value)
            return;
        super.set_scaleY(value);
        this.callLater(this._sizeChanged);
    }
    override get scaleY() {
        return super.scaleY;
    }
    onCompResize() {
        this._sizeChanged();
    }
    override set width(value) {
        this.set_width(value);
    }
    override set_width(value) {
        if (super.get_width() == value)
            return;
        super.set_width(value);
        this.callLater(this._sizeChanged);
    }
    override set height(value) {
        this.set_height(value);
    }
    override set_height(value) {
        if (super.get_height() == value)
            return;
        super.set_height(value);
        this.callLater(this._sizeChanged);
    }
    get anchorX() {
        return this.get_anchorX();
    }
    get_anchorX() {
        return this._anchorX;
    }
    set anchorX(value) {
        this.set_anchorX(value);
    }
    set_anchorX(value) {
        if (this._anchorX != value) {
            this._anchorX = value;
            this.callLater(this._sizeChanged);
        }
    }
    get anchorY() {
        return this.get_anchorY();
    }
    get_anchorY() {
        return this._anchorY;
    }
    set anchorY(value) {
        this.set_anchorY(value);
    }
    set_anchorY(value) {
        if (this._anchorY != value) {
            this._anchorY = value;
            this.callLater(this._sizeChanged);
        }
    }
    override _childChanged(child = null) {
        this.callLater(this._sizeChanged);
        super._childChanged(child);
    }
    anchor(x:number, y:number){
        this.set_anchorX(x);
        this.set_anchorY(y);
    }
}