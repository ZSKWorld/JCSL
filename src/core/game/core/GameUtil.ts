export class GameUtil {
    /** 获取gui图集贴图 */
    static getFGUITexture(pkg: string, name: string) {
        let temp = fgui.UIPackage.getItemByURL(fgui.UIPackage.getItemURL(pkg, name)).getBranch();
        temp = temp.getHighResolution();
        temp.load();
        return temp.texture;
    }
}