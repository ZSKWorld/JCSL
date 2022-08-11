export class AutoBitmap extends Laya.Graphics {
    public autoCacheCmd:boolean = true;
    private _width:number = 0;
    private _height:number  = 0;
    private uv:number[];
    private _source:Laya.Texture;
    private _sizeGrid:number[];
    private _offset:any[];
    private _drawGridCmd:any;
    private _isChanged:boolean;

    override destroy() {
        super.destroy();
        this._source = null;
        this._sizeGrid = null;
        this._offset = null;
    }
    get sizeGrid() {
        return this._sizeGrid;
    }
    set sizeGrid(value) {
        this._sizeGrid = value.map((v) => { return +v; });
        this._setChanged();
    }
    get width() {
        if (this._width)
            return this._width;
        if (this._source)
            return this._source.sourceWidth;
        return 0;
    }
    set width(value) {
        if (this._width != value) {
            this._width = value;
            this._setChanged();
        }
    }
    get height() {
        if (this._height)
            return this._height;
        if (this._source)
            return this._source.sourceHeight;
        return 0;
    }
    set height(value) {
        if (this._height != value) {
            this._height = value;
            this._setChanged();
        }
    }
    get source() {
        return this._source;
    }
    set source(value) {
        if (value) {
            this._source = value;
            this._setChanged();
        }
        else {
            this._source = null;
            if (this._drawGridCmd) {
                if (this["_one"]) {
                    if (this["_one"] == this._drawGridCmd) {
                        this.clear();
                    }
                }
                let cmds = this.cmds;
                if (cmds && cmds.length > 0) {
                    if (cmds[0] == this._drawGridCmd) {
                        cmds.splice(0, 1);
                    }
                }
            }
        }
    }
    _setChanged() {
        if (!this._isChanged) {
            this._isChanged = true;
            Laya.timer.callLater(this, this.changeSource);
        }
    }
    _createDrawTexture(texture, x = 0, y = 0, width = 0, height = 0, matrix = null, alpha = 1, color = null, blendMode = null, uv) {
        if (!texture || alpha < 0.01)
            return null;
        if (!texture.getIsReady())
            return null;
        if (!width)
            width = texture.sourceWidth;
        if (!height)
            height = texture.sourceHeight;
        if (texture.getIsReady()) {
            var wRate = width / texture.sourceWidth;
            var hRate = height / texture.sourceHeight;
            width = texture.width * wRate;
            height = texture.height * hRate;
            if (width <= 0 || height <= 0)
                return null;
            x += texture.offsetX * wRate;
            y += texture.offsetY * hRate;
        }
        if (this["_sp"]) {
            this["_sp"]._renderType |= Laya.SpriteConst.GRAPHICS;
            this["_sp"]._setRenderType(this["_sp"]._renderType);
        }
        return Laya.DrawTextureCmd.create.call(this, texture, x, y, width, height, matrix, alpha, color, blendMode, uv);
    }
    changeSource() {
        this._isChanged = false;
        var source = this._source;
        if (!source || !source.bitmap)
            return;
        var width = this.width;
        var height = this.height;
        var sizeGrid = this._sizeGrid;
        var sw = source.sourceWidth;
        var sh = source.sourceHeight;
        if (!sizeGrid || (sw === width && sh === height)) {
            let cmd = this._createDrawTexture(source, this._offset ? this._offset[0] : 0, this._offset ? this._offset[1] : 0, width, height, null, 1, null, null, this.uv);
            cmd && this._setDrawGridCmd(cmd);
        }
        else {
            let cmd = Laya["Draw9GridTexture"].create(source, 0, 0, width, height, sizeGrid);
            this._setDrawGridCmd(cmd);
        }
        this["_repaint"]();
    }
    drawBitmap(repeat, tex, x, y, width = 0, height = 0) {
        if (width < 0.1 || height < 0.1)
            return;
        if (repeat && (tex.width != width || tex.height != height))
            this.fillTexture(tex, x, y, width, height);
        else
            this.drawImage(tex, x, y, width, height);
    }
    static getTexture(tex, x, y, width, height) {
        if (width <= 0)
            width = 1;
        if (height <= 0)
            height = 1;
        tex.$_GID || (tex.$_GID = Laya.Utils.getGID());
        var texture;
        if (!texture || !texture._getSource()) {
            texture = Laya.Texture.createFromTexture(tex, x, y, width, height);
        }
        return texture;
    }
    _setDrawGridCmd(newcmd) {
        var source = this._source;
        if (!source || !source.bitmap) {
            return;
        }
        let cmds = this.cmds;
        if (!this["_one"] && (!cmds || cmds.length <= 0)) {
            this["_saveToCmd"](null, newcmd);
        }
        else {
            let lastOne = this["_one"];
            if (lastOne) {
                if (lastOne == this._drawGridCmd) {
                    this["_one"] = newcmd;
                }
                else {
                    this.clear();
                    this["_saveToCmd"](null, newcmd);
                    this["_saveToCmd"](null, lastOne);
                }
            }
            else {
                cmds.splice(0, 0, newcmd);
            }
        }
        this._drawGridCmd = newcmd;
    }
}