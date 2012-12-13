View = function(){

    var newThis = this;

    this.init = function(){

        this.mainLayout();

        this.historyBox = new HistoryBox(this);
        this.touchBox = new TouchBox(this);
        this.infoBox = new InfoBox(this);

    };

    this.mainLayout = function(){

        this.window = window;

        this.htmlBody = document.body;
        this.htmlBody.innerHTML = '<div id="mainDiv"><div id="touchBox"></div><div id="historyBox"></div></div>';

        this.htmlMainDiv = document.getElementById('mainDiv');

        this.htmlMainDiv.style.backgroundColor = 'gray';
        this.htmlMainDiv.style.position = 'absolute';
        this.htmlMainDiv.style.top = '0px';
        this.htmlMainDiv.style.left = '0px';
        this.htmlMainDiv.style.width = this.window.innerWidth + 'px';
        this.htmlMainDiv.style.height = this.window.innerHeight + 'px';

    };

    this.screenToCanvas = function(x,y){
        var newx = x - this.touchBox.htmlTouchBox.offsetLeft
            - parseInt(this.touchBox.htmlTouchBox.style.borderLeftWidth);
        var newy = y - this.touchBox.htmlTouchBox.offsetTop
            - parseInt(this.touchBox.htmlTouchBox.style.borderTopWidth);
        return [newx,newy];
    };

    this.setTouches = function(type,touch,target,changed){

        var a = {};

        a.newTouch = [];
        a.newTarget = [];
        a.newChanged = [];

        var loopTouches = function(touchType,touchArray){

            var l = touchArray.length;

            for(var i=0; i<l; i++){
                var x = newThis.screenToCanvas(touchArray[i].pageX,touchArray[i].pageY)[0];
                var y = newThis.screenToCanvas(touchArray[i].pageX,touchArray[i].pageY)[1];
                a['new'+touchType].push([x,y]);
            }

        };

        loopTouches('Touch',touch);
        loopTouches('Target',target);
        loopTouches('Changed',changed);

        this.touchBox.drawTouch.setEvents(type, a.newTouch, a.newTarget, a.newChanged);
        this.touchBox.drawTouch.drawPast(type, this.touchBox.ctxPastTouches, a.newChanged);
        this.touchBox.drawTouch.clearCanvas(this.touchBox.htmlPresentTouches,this.touchBox.ctxPresentTouches);
        this.touchBox.drawTouch.drawPresent(type, this.touchBox.ctxPresentTouches, a.newTouch, a.newTarget, a.newChanged);

        this.historyBox.setEvent(type);

    };

    this.resizeLayout = function() {
        this.init();
    };

    this.init();

};































