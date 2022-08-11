export class  UIUtils {
    static grayFilter = new Laya.ColorFilter([0.3086, 0.6094, 0.082, 0, 0, 0.3086, 0.6094, 0.082, 0, 0, 0.3086, 0.6094, 0.082, 0, 0, 0, 0, 0, 1, 0]);
    static gray(traget, isGray = true) {
        if (isGray) {
            this.addFilter(traget, this.grayFilter);
        }
        else {
            this.clearFilter(traget, Laya.ColorFilter);
        }
    }
    static addFilter(target, filter) {
        var filters = target.filters || [];
        filters.push(filter);
        target.filters = filters;
    }
    static clearFilter(target, filterType) {
        var filters = target.filters;
        if (filters != null && filters.length > 0) {
            for (var i = filters.length - 1; i > -1; i--) {
                var filter = filters[i];
                if (filter instanceof filterType)
                    filters.splice(i, 1);
            }
            target.filters = filters;
        }
    }
    static fillArray(arr, str, type = null) {
        var temp = arr.concat();
        if (str) {
            var a = str.split(",");
            for (var i = 0, n = Math.min(temp.length, a.length); i < n; i++) {
                var value = a[i];
                temp[i] = (value == "true" ? true : (value == "false" ? false : value));
                if (type != null)
                    temp[i] = type(value);
            }
        }
        return temp;
    }
}