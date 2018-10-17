let H5_loading = function (imgs,n) {
    if (!this._imgs){
        this._imgs = (imgs||[]).length;
        this._loaded = 0;
        window.id = this;
        for (let i in imgs){
            let img = new Image;
            img.onload = function () {
                window.id.loader();
            };
            img.src = imgs[i];
        }
    }else{
        this._loaded++;
        let per = Math.floor(this._loaded/this._imgs*100)+"%";
        $("#rate").text(per);
        return this;
    }



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
    return this;
};