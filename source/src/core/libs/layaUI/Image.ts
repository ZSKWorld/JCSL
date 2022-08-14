import { AutoBitmap } from "./AutoBitmap";
import { UIComponent } from "./UIComponent";
import { UIUtils } from "./UIUtils";

export class Image extends UIComponent {
    private _bitmap: AutoBitmap;
    private _skin: string;
    private _group: string;
    constructor(skin?: string | Laya.Texture) {
        super();
        if (skin) {
            if (typeof skin == "string") this.skin = skin;
            else this.source = skin;
        }
    }
    override destroy(destroyChild = true) {
        super.destroy(destroyChild);
        this._bitmap && this._bitmap.destroy();
        this._bitmap = null;
    }
    dispose() {
        this.destroy(true);
        Laya.loader.clearRes(this._skin);
    }
    override createChildren() {
        this.graphics = this._bitmap = new AutoBitmap();
        this._bitmap.autoCacheCmd = false;
    }
    get skin() {
        return this._skin;
    }
    set skin(value) {
        if (this._skin != value) {
            this._skin = value;
            if (value) {
                var source = Laya.Loader.getRes(value);
                if (source) {
                    this.source = source;
                    this.onCompResize();
                }
                else
                    Laya.loader.load(this._skin, Laya.Handler.create(this, this.setSource, [ this._skin ]), null, Laya.Loader.IMAGE, 1, true, this._group);
            }
            else {
                this.source = null;
            }
        }
    }
    get source() {
        return this._bitmap.source;
    }
    set source(value) {
        if (!this._bitmap)
            return;
        this._bitmap.source = value;
        this.event(Laya.Event.LOADED);
        this.repaint();
    }
    get group() {
        return this._group;
    }
    set group(value) {
        if (value && this._skin)
            Laya.Loader.setGroup(this._skin, value);
        this._group = value;
    }
    setSource(url, img = null) {
        if (url === this._skin && img) {
            this.source = img;
            this.onCompResize();
        }
    }
    override measureWidth() {
        return this._bitmap.width;
    }
    override measureHeight() {
        return this._bitmap.height;
    }
    override set width(value) {
        super.width = value;
        this._bitmap.width = value == 0 ? 0.0000001 : value;
    }
    override get width() {
        return super.width;
    }
    override set height(value) {
        super.height = value;
        this._bitmap.height = value == 0 ? 0.0000001 : value;
    }
    override get height() {
        return super.height;
    }
    get sizeGrid() {
        if (this._bitmap.sizeGrid)
            return this._bitmap.sizeGrid.join(",");
        return null;
    }
    set sizeGrid(value) {
        this._bitmap.sizeGrid = UIUtils.fillArray([ 4, 4, 4, 4, 0 ], value, Number);
    }
    override set dataSource(value) {
        this._dataSource = value;
        if (typeof (value) == 'string')
            this.skin = value;
        else
            super.dataSource = value;
    }
    override get dataSource() {
        return super.dataSource;
    }

    changeSource(img: Laya.Texture) {
        if (this.source == img) return;
        this.source = img;
        this.onCompResize();
    }
}