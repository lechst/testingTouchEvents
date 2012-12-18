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
        this.view.touchBox.htmlTouchBox.addEventListener('click',this.clickDrawEvent(),false);
        this.view.historyBox.htmlResetBox.addEventListener('click',this.clickResetEvent(),false);
        this.view.historyBox.htmlInfoBox.addEventListener('click',this.clickInfoShow(),false);
        this.view.historyBox.htmlHistoryLine.addEventListener('click',this.clickPastShow(),false);
        this.view.historyBox.htmlLeftDiv.addEventListener('click',this.clickPrevShow(),false);
        this.view.historyBox.htmlRightDiv.addEventListener('click',this.clickNextShow(),false);
        this.view.historyBox.htmlScrollCanvas.addEventListener('click',this.clickScrollShow(),false);
    };

    this.clickDrawEvent = function(){
        var that = this;
        return function(e){
            e.preventDefault();

            var touch = [{pageX: e.pageX, pageY: e.pageY}];
            var target = [{pageX: e.pageX, pageY: e.pageY}];
            var changed = [{pageX: e.pageX, pageY: e.pageY}];

            that.view.setTouches('start',touch,target,changed);
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

    this.clickInfoShow = function(){
        var that = this;
        return function(e){
            e.preventDefault();

            that.view.historyBox.htmlInfoBox.removeEventListener('click',arguments.callee,false);
            that.view.infoBox.intervalShowOn();
            that.view.historyBox.htmlInfoBox.addEventListener('click',that.clickInfoHide(),false);

        }
    };

    this.clickInfoHide = function(){
        var that = this;
        return function(e){
            e.preventDefault();

            that.view.historyBox.htmlInfoBox.removeEventListener('click',arguments.callee,false);
            that.view.infoBox.intervalHideOn();
            that.view.historyBox.htmlInfoBox.addEventListener('click',that.clickInfoShow(),false);

        }
    };

    this.clickPastShow = function(){
        var that = this;
        return function(e){
            e.preventDefault();

            var x = e.pageX;

            that.view.historyBox.changeCurrent(x);
        }
    };

    this.clickPrevShow = function(){
        var that = this;
        return function(e){
            e.preventDefault();
            if(that.view.historyBox.current > 0){
                that.view.historyBox.current -= 1;
                that.view.historyBox.drawEvents();
                that.view.historyBox.changeScrollDiv();
                that.view.historyBox.showCurrent();
            }

        }
    };

    this.clickNextShow = function(){
        var that = this;
        return function(e){
            e.preventDefault();

            if(that.view.historyBox.current < (that.view.historyBox.events.length-1)){
                that.view.historyBox.current += 1;
                that.view.historyBox.drawEvents();
                that.view.historyBox.changeScrollDiv();
                that.view.historyBox.showCurrent();
            }

        }
    };

    this.clickScrollShow = function(){
        var that = this;
        return function(e){
            e.preventDefault();
            that.view.historyBox.changeCurrentScroll(e.pageX);
        }
    };

    this.bindTouchEvents = function() {
        this.view.touchBox.htmlTouchBox.addEventListener('touchstart',this.touchStart(),false);
        this.view.touchBox.htmlTouchBox.addEventListener('touchmove',this.touchMove(),false);
        this.view.touchBox.htmlTouchBox.addEventListener('touchend',this.touchEnd(),false);
        this.view.historyBox.htmlResetBox.addEventListener('touchstart',this.touchResetEvent(),false);
        this.view.historyBox.htmlInfoBox.addEventListener('touchstart',this.touchInfoShow(),false);
        this.view.historyBox.htmlHistoryLine.addEventListener('touchstart',this.touchPastShow(),false);
        this.view.historyBox.htmlHistoryLine.addEventListener('touchmove',this.movePastShow(),false);
        this.view.historyBox.htmlHistoryLine.addEventListener('touchend',this.endPastShow(),false);
        this.view.historyBox.htmlLeftDiv.addEventListener('touchstart',this.touchPrevShow(),false);
        this.view.historyBox.htmlRightDiv.addEventListener('touchstart',this.touchNextShow(),false);
        this.view.historyBox.htmlScrollCanvas.addEventListener('touchstart',this.touchScrollShow(),false);
        this.view.historyBox.htmlScrollCanvas.addEventListener('touchmove',this.moveScrollShow(),false);
    };

    this.finger = 0;
    this.shift = 0;
    this.position = 0;

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

    this.touchInfoShow = function(){
        var that = this;
        return function(e){
            e.preventDefault();

            that.view.historyBox.htmlInfoBox.removeEventListener('touchstart',arguments.callee,false);
            that.view.infoBox.intervalShowOn();
            that.view.historyBox.htmlInfoBox.addEventListener('touchstart',that.touchInfoHide(),false);

        }
    };

    this.touchInfoHide = function(){
        var that = this;
        return function(e){
            e.preventDefault();

            that.view.historyBox.htmlInfoBox.removeEventListener('touchstart',arguments.callee,false);
            that.view.infoBox.intervalHideOn();
            that.view.historyBox.htmlInfoBox.addEventListener('touchstart',that.touchInfoShow(),false);

        }
    };

    this.touchPastShow = function(){
        var that = this;
        return function(e){
            e.preventDefault();

            var x = e.touches[0].pageX;
            that.finger = x;
            that.position = that.view.historyBox.current;
        }
    };

    this.movePastShow = function(){
        var that = this;
        return function(e){
            e.preventDefault();

            var x = e.touches[0].pageX;
            var dx = x - that.finger;
            that.shift += dx;
            that.finger = x;

            that.view.historyBox.current = that.position;
            that.view.historyBox.changeCurrent(that.view.historyBox.htmlHistoryLine.width/2
                + that.view.historyBox.htmlHistoryBox.offsetLeft
                + parseInt(that.view.historyBox.htmlHistoryBox.style.borderLeftWidth)
                + that.shift);
        }
    };

    this.endPastShow = function(){
        var that = this;
        return function(e){
            e.preventDefault();

            that.shift = 0;
        }
    };

    this.touchPrevShow = function(){
        var that = this;
        return function(e){
            e.preventDefault();
            console.log('test');
            if(that.view.historyBox.current > 0){
                that.view.historyBox.current -= 1;
                that.view.historyBox.drawEvents();
                that.view.historyBox.changeScrollDiv();
                that.view.historyBox.showCurrent();
            }

        }
    };

    this.touchNextShow = function(){
        var that = this;
        return function(e){
            e.preventDefault();

            if(that.view.historyBox.current < (that.view.historyBox.events.length-1)){
                that.view.historyBox.current += 1;
                that.view.historyBox.drawEvents();
                that.view.historyBox.changeScrollDiv();
                that.view.historyBox.showCurrent();
            }

        }
    };

    this.touchScrollShow = function(){
        var that = this;
        return function(e){
            e.preventDefault();
            var x = e.touches[0].pageX;
            that.view.historyBox.changeCurrentScroll(x);
        }
    };

    this.moveScrollShow = function(){
        var that = this;
        return function(e){
            e.preventDefault();
            var x = e.touches[0].pageX;
            that.view.historyBox.changeCurrentScroll(x);
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
