function H5_componentBase( name , cfg ) {
    cfg = cfg || {};
    var id = ("h5_c_"+Math.random()).replace(".","_");
    var cls = "h5_c_name_"+name+" h5_c h5_c_"+cfg.type;

    var component = $("<div id='"+id+"' class='"+cls+"'>");
    cfg.text && component.text(cfg.text);
    cfg.width && component.width(cfg.width/2);
    cfg.height && component.height(cfg.height/2);
    cfg.css && component.css(cfg.css);
    cfg.bg && component.css("backgroundImage","url("+cfg.bg+")");
    if (cfg.center === true){
        component.css({
            marginLeft : (cfg.width/4 * -1)+"px",
            left : "50%"
        })
    }
    component.on("onLeave",function () {
        $(this).addClass("h5_c_"+cfg.type+"_leave").removeClass("h5_c_"+cfg.type+"_load");
        cfg.animateOut && $(this).animate(cfg.animateOut);
        return false;
    });
    component.on("onLoad",function () {
        $(this).addClass("h5_c_"+cfg.type+"_load").removeClass("h5_c_"+cfg.type+"_leave");
        cfg.animateIn && $(this).delay(cfg.delay||0).animate(cfg.animateIn,cfg.speed||500);
        return false;
    });
    return component;
}