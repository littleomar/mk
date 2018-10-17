function H5_componentPoint(name,cfg) {
    var component = new H5_componentBase(name,cfg);
    var base = cfg.data[0][1];    //以第一个数据的大小为100%作为基础

    $.each(cfg.data,function (index,item) {
        var point = $("<div class='point point_"+index+"'>");
        var per = item[1]/base*100 + "%";
        var name = $("<div class='name'>"+item[0]+"</div>");
        var rate = $("<div class='rate'>"+item[1]*100+"%</div>");
        point.append(name).append(rate);
        point.width(per).height(per);
        item[2] && point.css("background-color",item[2]);
        if (item[3]!==undefined){
            point.css({left:item[3]});
        }
        if (item[4]!==undefined){
            point.css({top:item[4]});
        }
        component.append(point);
    });
    return component;
}