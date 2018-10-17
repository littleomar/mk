'use strict';
function H5_componentPie(name,cfg) {
    var component = new H5_componentBase(name,cfg);
    var w = cfg.width/2;
    var h = cfg.height/2;
    var r  = w/2-30;
    var x = w/2;
    var y = h/2;

    //先加入一个画布

    let cvs = document.createElement("canvas");
    let ctx = cvs.getContext("2d");
    let sAng = Math.PI*1.5;
    let eAng = 0;
    cvs.width = cvs.height = w;
    // cvs.style.backgroundColor="#eee";


    $.each(cfg.data,function (index,item) {
        eAng = item[1]*Math.PI*2+sAng;
        ctx.beginPath();
        ctx.fillStyle = item[2];
        ctx.moveTo(x,y);
        ctx.arc(x,y,r,sAng,eAng);
        ctx.fill();
        sAng = eAng;
    });

    //添加文本

    sAng = -Math.PI;
    $.each(cfg.data,function (index,item) {
        eAng = sAng-item[1]*Math.PI*2;
        let text = $("<div class='text'>");
        text.text(item[0]);
        component.append(text);
        text.css("top",y+Math.cos((sAng+eAng)/2)*r*1.15-8);
        if (Math.sin((sAng+eAng)/2)>0){
            text.css("left",x+Math.sin((sAng+eAng)/2)*r*1.15+15);
        } else{
            text.css("left",x+Math.sin((sAng+eAng)/2)*r*1.15-64);
        }
        sAng = eAng;
    });


    //画出数据指引线
    //添加画指引线的画布
    let cvs_ln = document.createElement("canvas");
    let ctx_ln = cvs_ln.getContext("2d");
    cvs_ln.width = cvs_ln.height = w;
    function draw_line(val){
        ctx_ln.lineWidth = 1;
        ctx_ln.clearRect(0,0,cvs_ln.width,cvs_ln.height);
        sAng = -Math.PI;
        $.each(cfg.data,function (index,item) {
            eAng = sAng-item[1]*Math.PI*2;
            ctx_ln.strokeStyle = item[2];
            ctx_ln.beginPath();
            if (val-1<=0){
                ctx_ln.moveTo(x+Math.sin((sAng+eAng)/2)*r*0.9,y+Math.cos((sAng+eAng)/2)*r*0.9);
                ctx_ln.lineTo(x+Math.sin((sAng+eAng)/2)*r*(0.9+0.25*val),y+Math.cos((sAng+eAng)/2)*r*(0.9+0.25*val));
            }else{
                ctx_ln.moveTo(x+Math.sin((sAng+eAng)/2)*r*0.9,y+Math.cos((sAng+eAng)/2)*r*0.9);
                ctx_ln.lineTo(x+Math.sin((sAng+eAng)/2)*r*(0.9+0.25),y+Math.cos((sAng+eAng)/2)*r*(0.9+0.25));
                if (Math.sin((sAng+eAng)/2)>0){
                    ctx_ln.lineTo(x+Math.sin((sAng+eAng)/2)*r*1.15+20*(val-1),y+Math.cos((sAng+eAng)/2)*r*1.15);
                } else{
                    ctx_ln.lineTo(x+Math.sin((sAng+eAng)/2)*r*1.15-20*(val-1),y+Math.cos((sAng+eAng)/2)*r*1.15);
                }

            }
            ctx_ln.stroke();
            sAng = eAng;
        });
    }









    //画出蒙版遮挡画到的  数据层 配合动画
    let cvs_bg = document.createElement("canvas");
    let ctx_bg = cvs_bg.getContext("2d");
    cvs_bg.width  =cvs_bg.height = w;
    ctx_bg.fillStyle = "#fff";
    function draw(val) {
        ctx_bg.clearRect(0,0,w,w);
        ctx_bg.beginPath();
        ctx_bg.moveTo(x,y);
        ctx_bg.arc(x,y,r+1,Math.PI*1.5,Math.PI*1.5+Math.PI*2*val,true);
        ctx_bg.fill();
    }





    component.on("onLoad",function () {
        for (let i = 0;i<=100;++i){
            setTimeout(function () {
                draw(i/100);
            },i*10)
        }

        for (let i = 0;i<100;++i){
            setTimeout(function () {
                draw_line(i/50);
            },i*6+1000)
        }
    });
    component.on("onLeave",function () {
        for (let i = 0;i<=100;++i){
            setTimeout(function () {
                draw(1-i/100);
            },i*5)
        }

        for (let i = 0;i<100;++i){
            setTimeout(function () {
                draw_line(2-i/50);
            },i*3)
        }
    });
    component.append(cvs);
    component.append(cvs_ln);
    component.append(cvs_bg);

    return component;

}