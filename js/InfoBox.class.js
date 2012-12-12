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
        this.stepH = 5;
        this.stepW = 10;

    };

    this.intervalShowOn = function(){
        this.view.historyBox.htmlInfoBox.innerHTML = '';
        this.intervalShow = setInterval(function(){newThis.showInfoBox();},1);
    };
    this.intervalShowOff = function(){
        this.view.historyBox.htmlInfoBox.style.height = this.view.historyBox.htmlInfoBox.finalHeight + 'px';
        this.view.historyBox.htmlInfoBox.style.width = this.view.historyBox.htmlInfoBox.finalWidth + 'px';
        this.view.historyBox.htmlInfoBox.innerHTML = '<p class="info">Here will be the information for the user.</p>';
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

