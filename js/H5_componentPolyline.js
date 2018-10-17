'use strict';
function H5_componentPolyline(name,cfg) {
    var component = new H5_componentBase(name,cfg);
    var w = cfg.width/2-11;
    var h = cfg.height/2-1;


    //先加入一个画布
    var cvs_bg = document.createElement("canvas");
    // cvs.style.backgroundColor = "#ffc";
    var ctx_bg = cvs_bg.getContext("2d");
    cvs_bg.width = w+11;
    cvs_bg.height = h+1;


    //绘制网格图
    ctx_bg.beginPath();
    ctx_bg.lineWidth = 1;
    ctx_bg.strokeStyle = "#aaaaaa";
    var step = h/5;
    //--绘制水平网格
    for (var i = 0 ;i<7;++i){
        ctx_bg.moveTo(5,step*i+0.5);
        ctx_bg.lineTo(w+5,step*i+0.5);
    }
    //--绘制垂直网格
    step = w/(cfg.data.length-1);
    for (let i in cfg.data){
        ctx_bg.moveTo(0.5+step*i+5,0);
        ctx_bg.lineTo(0.5+step*i+5,h);

        //写出项目名称
        let text = $("<div class='text'>");
        text.css({
            width:w/4,
            left:w/4*(i-0.5)+5
        });
        text.text(cfg.data[i][0]);
        component.append(text);
    }
    ctx_bg.stroke();
    /**
     * 绘制折线图
     * @param val
     */

    let cvs = document.createElement("canvas");
    let ctx = cvs.getContext("2d");
    cvs.width = w+11;
    cvs.height = h+1;
    function draw(val){

        //进入函数时需要首先清除画布
        ctx.clearRect(0,0,cvs.width,cvs.height);
        let step = w/(cfg.data.length-1);
        //绘制折线
        ctx.beginPath();
        ctx.lineWidth = 1;
        ctx.strokeStyle = "#F00";
        $.each(cfg.data,function (index,item) {
            ctx.lineTo(index*step+5,h-h*0.8*(item[1]/0.4)*val);
        }) ;
        ctx.stroke();

        //绘制折现断点的圆
        ctx.beginPath();
        ctx.lineWidth = 2;
        ctx.strokeStyle = "#F00";
        ctx.fillStyle = "#fff";
        $.each(cfg.data,function (index,item) {
            ctx.beginPath();
            ctx.moveTo(index*step+5,h-h*0.8*(item[1]/0.4)*val);
            ctx.arc(index*step+5,h-h*0.8*(item[1]/0.4)*val,3,0,Math.PI*2);
            ctx.stroke();
            ctx.fill();

        }) ;

        //绘制项目百分数
        ctx.beginPath();
        ctx.textAlign = "center";
        ctx.font = '10px Arial';
        ctx.fillStyle = "#525252";
        $.each(cfg.data,function (index,item) {
            let per = Math.floor(item[1]*100)+"%";
            if (index === 0 ){
                ctx.fillText(per, index*step+10,(h-h*0.8*(item[1]/0.4)*val)-8);
            } else if(index === 4){
                ctx.fillText(per, index*step,(h-h*0.8*(item[1]/0.4)*val)-8);
            }else{
                ctx.fillText(per, index*step+5,(h-h*0.8*(item[1]/0.4)*val)-8);
            }
        }) ;


        //绘制 折线下部阴影区域
        ctx.beginPath();
        ctx.lineWidth = 0;
        ctx.fillStyle = "rgba(255,136,120,.2)";
        $.each(cfg.data,function (index,item) {
            ctx.lineTo(index*step+5,h-h*0.8*(item[1]/0.4)*val);
        }) ;
        ctx.lineTo(w+5,h);
        ctx.lineTo(6,h);
        ctx.closePath();
        ctx.fill();
    }
    draw(0);
    // for (let i = 0;i<100;++i){
    //     setTimeout(function () {
    //         draw(i/100);
    //     },i*10+1500)
    // }

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
            },i*5+500)
        }
    });

    component.append(cvs_bg);
    component.append(cvs);
    return component;

}