
export class Widget extends Laya.Component {
    static EMPTY: Widget = new Widget();
    private _top: number;
    private _bottom: number;
    private _left: number;
    private _right: number;
    private _centerX: number;
    private _centerY: number;
    constructor() {
        super();
        this._top = NaN;
        this._bottom = NaN;
        this._left = NaN;
        this._right = NaN;
        this._centerX = NaN;
        this._centerY = NaN;
    }
    onReset() {
        this._top = this._bottom = this._left = this._right = this._centerX = this._centerY = NaN;
    }
    _onEnable() {
        if (this.owner.parent)
            this._onAdded();
        else
            this.owner.once(Laya.Event.ADDED, this, this._onAdded);
    }
    _onDisable() {
        this.owner.off(Laya.Event.ADDED, this, this._onAdded);
        if (this.owner.parent)
            this.owner.parent.off(Laya.Event.RESIZE, this, this._onParentResize);
    }
    _onAdded() {
        if (this.owner.parent)
            this.owner.parent.on(Laya.Event.RESIZE, this, this._onParentResize);
        this.resetLayoutX();
        this.resetLayoutY();
    }
    _onParentResize() {
        var flagX = this.resetLayoutX();
        var flagY = this.resetLayoutY();
        if (flagX || flagY)
            this.owner.event(Laya.Event.RESIZE);
    }
    resetLayoutX() {
        const owner = this.owner as Laya.Sprite;
        if (!owner)
            return false;
        const parent = owner.parent as Laya.Sprite;
        if (parent) {
            if (!isNaN(this.centerX)) {
                owner.x = Math.round((parent.width - owner.displayWidth) * 0.5 + this.centerX + owner.pivotX * owner.scaleX);
            }
            else if (!isNaN(this.left)) {
                owner.x = Math.round(this.left + owner.pivotX * owner.scaleX);
                if (!isNaN(this.right)) {
                    if (!parent[ "_width" ])
                        return false;
                    var temp = (parent[ "_width" ] - this.left - this.right) / (owner.scaleX || 0.01);
                    if (temp != owner.width) {
                        owner.width = temp;
                        return true;
                    }
                }
            }
            else if (!isNaN(this.right)) {
                owner.x = Math.round(parent.width - owner.displayWidth - this.right + owner.pivotX * owner.scaleX);
            }
        }
        return false;
    }
    resetLayoutY() {
        const owner = this.owner as Laya.Sprite;
        if (!owner)
            return false;
        const parent = owner.parent as Laya.Sprite;
        if (parent) {
            if (!isNaN(this.centerY)) {
                owner.y = Math.round((parent.height - owner.displayHeight) * 0.5 + this.centerY + owner.pivotY * owner.scaleY);
            }
            else if (!isNaN(this.top)) {
                owner.y = Math.round(this.top + owner.pivotY * owner.scaleY);
                if (!isNaN(this.bottom)) {
                    if (!parent["_height"])
                        return false;
                    var temp = (parent["_height"] - this.top - this.bottom) / (owner.scaleY || 0.01);
                    if (temp != owner.height) {
                        owner.height = temp;
                        return true;
                    }
                }
            }
            else if (!isNaN(this.bottom)) {
                owner.y = Math.round(parent.height - owner.displayHeight - this.bottom + owner.pivotY * owner.scaleY);
            }
        }
        return false;
    }
    resetLayout() {
        if (this.owner) {
            this.resetLayoutX();
            this.resetLayoutY();
        }
    }
    get top() {
        return this._top;
    }
    set top(value) {
        if (this._top != value) {
            this._top = value;
            this.resetLayoutY();
        }
    }
    get bottom() {
        return this._bottom;
    }
    set bottom(value) {
        if (this._bottom != value) {
            this._bottom = value;
            this.resetLayoutY();
        }
    }
    get left() {
        return this._left;
    }
    set left(value) {
        if (this._left != value) {
            this._left = value;
            this.resetLayoutX();
        }
    }
    get right() {
        return this._right;
    }
    set right(value) {
        if (this._right != value) {
            this._right = value;
            this.resetLayoutX();
        }
    }
    get centerX() {
        return this._centerX;
    }
    set centerX(value) {
        if (this._centerX != value) {
            this._centerX = value;
            this.resetLayoutX();
        }
    }
    get centerY() {
        return this._centerY;
    }
    set centerY(value) {
        if (this._centerY != value) {
            this._centerY = value;
            this.resetLayoutY();
        }
    }
}