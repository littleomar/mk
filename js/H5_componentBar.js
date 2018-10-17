function H5_componentBar(name,cfg) {
    var component = new H5_componentBase(name,cfg);
    var mul = 1;
    if (cfg.data[0][1]>=0.5){
        mul = 1;
    } else if(cfg.data[0][1]>=0.4){
        mul = 2;
    }
    else if(cfg.data[0][1]>=0.3){
        mul = 2.5;
    }
    else if(cfg.data[0][1]>=0.2){
        mul = 3;
    }else{
        mul = 4;
    }
    $.each(cfg.data,function (index,item) {
        var line = $("<div class='line'>");
        var name = $("<div class='name'>");
        var sty = "";
        var rate = $("<div class='rate' "+sty+">");
        rate.html("<div class='bg'></div>");
        var per = $("<div class='per'>");
        var val = Math.floor(item[1]*100);
        item[2] && rate.find(".bg").css({backgroundColor:item[2]});
        rate.width(val*mul+"%");
        per.text(val+"%");
        per.css("left",val*mul+5+"%");
        name.text(item[0]);
        line.append(name).append(rate).append(per);
        component.append(line);
    });
    return component;

}