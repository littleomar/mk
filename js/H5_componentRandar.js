'use strict';
function H5_componentRandar(name,cfg) {
    var component = new H5_componentBase(name,cfg);
    var w = cfg.width/2;
    var h = cfg.height/2;
    var r  = w/2-5;
    var x = w/2;
    var y = h/2;
    var len = cfg.data.length;


    //先加入一个画布
    var cvs_bg = document.createElement("canvas");
    var ctx_bg = cvs_bg.getContext("2d");
    cvs_bg.width = w;
    cvs_bg.height = h;

    //绘制雷达背景图
    ctx_bg.fillStyle = "#ccc";
    for (let i = 6;i>0;--i){
        ctx_bg.beginPath();
        ctx_bg.fillStyle = i%2===0?"#99c0ff":"#f1f9ff";
        $.each(cfg.data,function (index,item) {
            ctx_bg.lineTo(Math.sin(2*Math.PI/len*index)*r/6*i+x,Math.cos(2*Math.PI/len*index)*r/6*i+y);
        }) ;
        ctx_bg.closePath();
        ctx_bg.fill();
    }

    //绘制伞骨

    ctx_bg.beginPath();
    ctx_bg.strokeStyle = "#e0e0e0";
    ctx_bg.lineWidth = 2;
    $.each(cfg.data,function (index,item) {
        ctx_bg.moveTo(x,y);
        ctx_bg.lineTo(Math.sin(2*Math.PI/len*index)*r+x,Math.cos(2*Math.PI/len*index)*r+y);

        //添加背景层数据
        let name = $("<div class='name'>");
        name.text(item[0]);

        name.css("width","50px");
        if (Math.cos(2*Math.PI/len*index)<0){
            name.css("top",Math.cos(2*Math.PI/len*index)*r+y-16+"px");
        } else{
            name.css("top",Math.cos(2*Math.PI/len*index)*r+y+"px");
        }
        if (Math.sin(2*Math.PI/len*index)<0){
            name.css("left", Math.sin(2*Math.PI/len*index)*r+x-25-10+"px");
        } else if(Math.sin(2*Math.PI/len*index)>0){
            name.css("left", Math.sin(2*Math.PI/len*index)*r+x-25+10+"px");
        }else{
            name.css("left", Math.sin(2*Math.PI/len*index)*r+x-25+"px");
        }


        component.append(name)
    }) ;
    ctx_bg.stroke();

    /**
     * 绘制折线图
     * @param val
     */





    let cvs = document.createElement("canvas");
    let ctx = cvs.getContext("2d");
    cvs.width = w;
    cvs.height = h;
    function draw(val){

        //进入函数时需要首先清除画布
        ctx.clearRect(0,0,cvs.width,cvs.height);


        //开始画数据折线图
        ctx.beginPath();
        ctx.lineWidth = 1;
        ctx.strokeStyle = "#f00";
        $.each(cfg.data,function (index,item) {
            ctx.lineTo((Math.sin(2*Math.PI/len*index)*r*item[1]*2)*val+x,(Math.cos(2*Math.PI/len*index)*r*item[1]*2)*val+y);
        });
        ctx.closePath();
        ctx.stroke();

        //画折线图上的数据点
        ctx.fillStyle = "#f00";
        $.each(cfg.data,function (index,item) {
            ctx.beginPath();
            ctx.arc((Math.sin(2*Math.PI/len*index)*r*item[1]*2)*val+x,(Math.cos(2*Math.PI/len*index)*r*item[1]*2)*val+y,3,0,Math.PI*2);
            ctx.fill();
        });


    }


    component.on("onLoad",function () {
        for (let i = 0;i<100;++i){
            setTimeout(function () {
                draw(i/100);
            },i*5+500)
        }
    });
    component.on("onLeave",function () {
        for (let i = 0;i<100;++i){
            setTimeout(function () {
                draw(1-i/100);
            },i*5)
        }
    });
    component.append(cvs_bg);
    component.append(cvs);
    return component;

}