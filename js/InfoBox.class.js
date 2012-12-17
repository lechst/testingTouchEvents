InfoBox = function(view){

    var newThis = this;

    this.view = view;

    this.init = function(){

        this.infoBoxLayout();

        this.drawTouch = new DrawTouch();

    };

    this.infoBoxLayout = function(){

        this.view.historyBox.htmlInfoBox.innerHTML = '<p class="info">i</p>';

        this.htmlInfoP = document.getElementsByClassName('info')[0];
        this.htmlInfoP.style.width = this.view.historyBox.htmlInfoBox.style.height;
        this.htmlInfoP.style.height = parseInt(parseInt(this.view.historyBox.htmlInfoBox.style.height)/2) + 'px';
        this.htmlInfoP.style.marginTop = parseInt(parseInt(this.view.historyBox.htmlInfoBox.style.height)/4-2) + 'px';
        this.htmlInfoP.style.marginBottom = parseInt(parseInt(this.view.historyBox.htmlInfoBox.style.height)/4) + 'px';
        this.htmlInfoP.style.padding = '0px';
        this.htmlInfoP.style.textAlign = 'center';
        this.htmlInfoP.style.fontSize = parseInt(this.htmlInfoP.style.height)+'px';

        this.view.historyBox.htmlInfoBox.initialHeight = this.view.historyBox.htmlInfoBox.offsetHeight
            - parseInt(this.view.historyBox.htmlInfoBox.style.borderTopWidth)
            - parseInt(this.view.historyBox.htmlInfoBox.style.borderBottomWidth);
        this.view.historyBox.htmlInfoBox.finalHeight = this.view.historyBox.htmlHistoryBox.offsetHeight
            + this.view.historyBox.view.touchBox.htmlTouchBox.offsetHeight
            + Math.max(parseInt(this.view.touchBox.htmlTouchBox.style.marginBottom),parseInt(this.view.historyBox.htmlHistoryBox.style.marginTop))
            - parseInt(this.view.historyBox.htmlHistoryBox.style.borderTopWidth)
            - parseInt(this.view.historyBox.htmlHistoryBox.style.borderBottomWidth);
        this.view.historyBox.htmlInfoBox.initialWidth = this.view.historyBox.htmlInfoBox.offsetWidth
            - parseInt(this.view.historyBox.htmlInfoBox.style.borderLeftWidth)
            - parseInt(this.view.historyBox.htmlInfoBox.style.borderRightWidth);
        this.view.historyBox.htmlInfoBox.finalWidth = this.view.historyBox.htmlHistoryBox.offsetWidth
            - parseInt(this.view.historyBox.htmlHistoryBox.style.borderLeftWidth)
            - parseInt(this.view.historyBox.htmlHistoryBox.style.borderRightWidth);
        var dh = this.view.historyBox.htmlInfoBox.finalHeight - this.view.historyBox.htmlInfoBox.initialHeight;
        var dw = this.view.historyBox.htmlInfoBox.finalWidth - this.view.historyBox.htmlInfoBox.initialWidth;
        var stepSpeed = 5;
        if(dh > dw){
            this.stepH = parseInt(dh/dw) * stepSpeed;
            this.stepW = stepSpeed;
        }
        else {
            this.stepH = stepSpeed;
            this.stepW = parseInt(dw/dh) * stepSpeed;
        }
    };

    this.intervalShowOn = function(){
        this.view.historyBox.htmlInfoBox.innerHTML = '';
        this.intervalShow = setInterval(function(){newThis.showInfoBox();},1);
    };
    this.intervalShowOff = function(){
        this.view.historyBox.htmlInfoBox.style.height = this.view.historyBox.htmlInfoBox.finalHeight + 'px';
        this.view.historyBox.htmlInfoBox.style.width = this.view.historyBox.htmlInfoBox.finalWidth + 'px';

        this.view.historyBox.htmlInfoBox.innerHTML = '<canvas id="infoCanvas"></canvas>';

        this.htmlInfoCanvas = document.getElementById('infoCanvas');
        this.htmlInfoCanvas.style.width = this.view.historyBox.htmlInfoBox.finalWidth + 'px';
        this.htmlInfoCanvas.style.height = this.view.historyBox.htmlInfoBox.finalHeight + 'px';
        this.htmlInfoCanvas.width = this.htmlInfoCanvas.offsetWidth;
        this.htmlInfoCanvas.height = this.htmlInfoCanvas.offsetHeight;
        this.ctxInfoCanvas = this.htmlInfoCanvas.getContext('2d');

        this.drawTouch.drawTouch(this.htmlInfoCanvas.width/4,this.htmlInfoCanvas.height/3,'start',this.ctxInfoCanvas);
        this.ctxInfoCanvas.fillText('touchstart',this.htmlInfoCanvas.width/4-this.drawTouch.parameters.radius,this.htmlInfoCanvas.height/3+this.drawTouch.parameters.radius+20);

        this.drawTouch.drawTouch(2*this.htmlInfoCanvas.width/4,this.htmlInfoCanvas.height/3,'move',this.ctxInfoCanvas);
        this.ctxInfoCanvas.fillText('touchmove',2*this.htmlInfoCanvas.width/4-this.drawTouch.parameters.radius,this.htmlInfoCanvas.height/3+this.drawTouch.parameters.radius+20);

        this.drawTouch.drawTouch(3*this.htmlInfoCanvas.width/4,this.htmlInfoCanvas.height/3,'end',this.ctxInfoCanvas);
        this.ctxInfoCanvas.fillText('touchend',3*this.htmlInfoCanvas.width/4-this.drawTouch.parameters.radius,this.htmlInfoCanvas.height/3+this.drawTouch.parameters.radius+20);

        this.drawTouch.drawTouch(this.htmlInfoCanvas.width/4,2*this.htmlInfoCanvas.height/3,'start',this.ctxInfoCanvas);
        this.ctxInfoCanvas.fillText('touches',this.htmlInfoCanvas.width/4-this.drawTouch.parameters.radius,2*this.htmlInfoCanvas.height/3+this.drawTouch.parameters.radius+20);

        this.drawTouch.drawTouch(2*this.htmlInfoCanvas.width/4,2*this.htmlInfoCanvas.height/3,'start',this.ctxInfoCanvas);
        this.drawTouch.drawTarget(2*this.htmlInfoCanvas.width/4,2*this.htmlInfoCanvas.height/3,'start',this.ctxInfoCanvas);
        this.ctxInfoCanvas.fillText('targetTouches',2*this.htmlInfoCanvas.width/4-this.drawTouch.parameters.radius,2*this.htmlInfoCanvas.height/3+this.drawTouch.parameters.radius+20);

        this.drawTouch.drawChanged(3*this.htmlInfoCanvas.width/4,2*this.htmlInfoCanvas.height/3,'start',this.ctxInfoCanvas);
        this.ctxInfoCanvas.fillText('changedTouches',3*this.htmlInfoCanvas.width/4-this.drawTouch.parameters.radius,2*this.htmlInfoCanvas.height/3+this.drawTouch.parameters.radius+20);

        clearInterval(this.intervalShow);
    };

    this.showInfoBox = function(){

        this.view.historyBox.htmlInfoBox.style.height = (parseInt(this.view.historyBox.htmlInfoBox.style.height)+this.stepH) + 'px';
        this.view.historyBox.htmlInfoBox.style.width = (parseInt(this.view.historyBox.htmlInfoBox.style.width)+this.stepW) + 'px';

        if((parseInt(this.view.historyBox.htmlInfoBox.style.height)+this.stepH) >= this.view.historyBox.htmlInfoBox.finalHeight){
            this.view.historyBox.htmlInfoBox.style.height = this.view.historyBox.htmlInfoBox.finalHeight + 'px';
        }

        if((parseInt(this.view.historyBox.htmlInfoBox.style.width)+this.stepW) >= this.view.historyBox.htmlInfoBox.finalWidth){
            this.view.historyBox.htmlInfoBox.style.width = this.view.historyBox.htmlInfoBox.finalWidth + 'px';
        }

        if((parseInt(this.view.historyBox.htmlInfoBox.style.height)+this.stepH) >= this.view.historyBox.htmlInfoBox.finalHeight
            && (parseInt(this.view.historyBox.htmlInfoBox.style.width)+this.stepW) >= this.view.historyBox.htmlInfoBox.finalWidth){
            this.intervalShowOff();
        }

    };

    this.intervalHideOn = function(){
        this.view.historyBox.htmlInfoBox.innerHTML = '';
        this.intervalHide = setInterval(function(){newThis.hideInfoBox();},1);
    };
    this.intervalHideOff = function(){
        this.view.historyBox.htmlInfoBox.style.height = this.view.historyBox.htmlInfoBox.initialHeight + 'px';
        this.view.historyBox.htmlInfoBox.style.width = this.view.historyBox.htmlInfoBox.initialWidth + 'px';
        this.view.historyBox.htmlInfoBox.innerHTML = '<p class="info">i</p>';
        this.htmlInfoP = document.getElementsByClassName('info')[0];
        this.htmlInfoP.style.width = this.view.historyBox.htmlInfoBox.style.height;
        this.htmlInfoP.style.height = parseInt(parseInt(this.view.historyBox.htmlInfoBox.style.height)/2) + 'px';
        this.htmlInfoP.style.marginTop = parseInt(parseInt(this.view.historyBox.htmlInfoBox.style.height)/4-2) + 'px';
        this.htmlInfoP.style.marginBottom = parseInt(parseInt(this.view.historyBox.htmlInfoBox.style.height)/4) + 'px';
        this.htmlInfoP.style.padding = '0px';
        this.htmlInfoP.style.textAlign = 'center';
        this.htmlInfoP.style.fontSize = parseInt(this.htmlInfoP.style.height)+'px';
        clearInterval(this.intervalHide);
    };

    this.hideInfoBox = function(){

        this.view.historyBox.htmlInfoBox.style.height = (parseInt(this.view.historyBox.htmlInfoBox.style.height)-this.stepH) + 'px';
        this.view.historyBox.htmlInfoBox.style.width = (parseInt(this.view.historyBox.htmlInfoBox.style.width)-this.stepW) + 'px';

        if((parseInt(this.view.historyBox.htmlInfoBox.style.height)-this.stepH) <= this.view.historyBox.htmlInfoBox.initialHeight){
            this.view.historyBox.htmlInfoBox.style.height = this.view.historyBox.htmlInfoBox.initialHeight + 'px';
        }

        if((parseInt(this.view.historyBox.htmlInfoBox.style.width)-this.stepW) <= this.view.historyBox.htmlInfoBox.initialWidth){
            this.view.historyBox.htmlInfoBox.style.width = this.view.historyBox.htmlInfoBox.initialWidth + 'px';
        }

        if((parseInt(this.view.historyBox.htmlInfoBox.style.height)-this.stepH) <= this.view.historyBox.htmlInfoBox.initialHeight
            && (parseInt(this.view.historyBox.htmlInfoBox.style.width)-this.stepW) <= this.view.historyBox.htmlInfoBox.initialWidth){
            this.intervalHideOff();
        }

    };

    this.init();

};

