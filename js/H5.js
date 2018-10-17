var H5 = function () {

    this.page = [];
    this.id = ("h5_"+Math.random()).replace(".","_");

    this.el = $("<div class='h5' id='"+this.id+"'>");
    this.addPage = function (name,text) {
        var page = $("<div class='h5_page section'>");
        name && page.addClass("h5_page_"+name);
        text && page.text(text);
        this.el.append(page);
        this.page.push(page);
        return this;
    };
    this.addComponent = function (name,cfg) {
        cfg = cfg || {};
        cfg = $.extend({
            type : 'base'
        },cfg);
        var component;
        var page = this.page.slice(-1)[0];

        switch (cfg.type) {
            case "base":
                component = new H5_componentBase(name,cfg);
                break;
            case "polyline":
                component = new H5_componentPolyline(name,cfg);
                break;
            case "pie":
                component = new H5_componentPie(name,cfg);
                break;
            case "bar":
                component = new H5_componentBar(name,cfg);
                break;
            case "randar":
                component = new H5_componentRandar(name,cfg);
                break;
        }
        page.append(component);
        return this;
    };
    this.loader = function (imgs,n) {
        $("body").append(this.el);
        this.el.fullpage({
            onLeave : function (origin, destination, direction) {
                $(origin.item).find(".h5_c").trigger("onLeave");
            },
            afterLoad : function (origin, destination, direction) {
                $(destination.item).find(".h5_c").trigger("onLoad");
            }
        });
        fullpage_api.moveTo(n||1);
    };
    this.loader = typeof H5_loading === "function" ? H5_loading :this.loader;
    return this;
};