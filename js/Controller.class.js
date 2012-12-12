Controller = function(){

    this.view = new View();

    this.init = function(){

        this.device = this.checkDevice();

        if(this.device.iphone||this.device.ipad||this.device.ipod) {
            this.bindTouchEvents();
        } else {
            this.bindMouseEvents();
        }

        this.bindResizeEvents();

    };

    this.bindMouseEvents = function() {
        this.view.touchBox.htmlTouchBox.addEventListener('click',this.clickDrawEvent());
        this.view.historyBox.htmlResetBox.addEventListener('click',this.clickResetEvent());
    };

    this.clickDrawEvent = function(){
        var that = this;
        return function(e){
            e.preventDefault();

            var touch = [{pageX: e.pageX, pageY: e.pageY}];
            var target = [{pageX: e.pageX, pageY: e.pageY}];
            var changed = [{pageX: e.pageX, pageY: e.pageY}];

            that.view.setTouches('move',touch,target,changed);
        }
    };

    this.clickResetEvent = function(){
        var that = this;
        return function(e){
            e.preventDefault();

            that.view.init();
            that.init();
        }
    };

    this.bindTouchEvents = function() {
        this.view.touchBox.htmlTouchBox.addEventListener('touchstart',this.touchStart(),false);
        this.view.touchBox.htmlTouchBox.addEventListener('touchmove',this.touchMove(),false);
        this.view.touchBox.htmlTouchBox.addEventListener('touchend',this.touchEnd(),false);
        this.view.historyBox.htmlResetBox.addEventListener('touchstart',this.touchResetEvent());
    };

    this.touchStart = function(){
        var that = this;
        return function(e){
            e.preventDefault();
            that.view.setTouches('start',e.touches,e.targetTouches,e.changedTouches);
        }
    };

    this.touchMove = function(){
        var that = this;
        return function(e){
            e.preventDefault();
            that.view.setTouches('move',e.touches,e.targetTouches,e.changedTouches);
        }
    };

    this.touchEnd = function(){
        var that = this;
        return function(e){
            e.preventDefault();
            that.view.setTouches('end',e.touches,e.targetTouches,e.changedTouches);
        }
    };

    this.touchResetEvent = function(){
        var that = this;
        return function(e){
            e.preventDefault();

            that.view.init();
            that.init();
        }
    };

    this.checkDevice = function(){
        var ua = navigator.userAgent;
        var checker = {
            iphone: ua.match(/iPhone/),
            ipod: ua.match(/iPod/),
            ipad: ua.match(/iPad/),
            blackberry: ua.match(/BlackBerry/),
            android: ua.match(/Android/),
            chrome: ua.match(/Chrome/),
            firefox: ua.match(/Firefox/)
        };
        return checker;
    };

    this.bindResizeEvents = function() {
        if(this.device.iphone||this.device.ipad||this.device.ipod) {
            window.addEventListener('orientationchange', this.checkWindowSize(), false);
        } else {
            window.addEventListener('resize', this.checkWindowSize(), false);
        }
    };

    this.checkWindowSize = function(){

        var that = this;

        return function(e){
            e.preventDefault();
            if(that.device.iphone||that.device.ipad||that.device.ipod) {
                window.removeEventListener('orientationchange',arguments.callee,false);
            } else {
                window.removeEventListener('resize',arguments.callee,false);
            }
            that.view.resizeLayout();
            that.init();
        }

    };

    this.init();

};
