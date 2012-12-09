TouchBox = function(view){

    this.view = view;

    this.init = function(){

        this.touchBoxLayout();

        this.circleObj = new CircleObj();

    };

    this.touchBoxLayout = function(){

        this.htmlTouchBox = document.getElementById('touchBox');

        this.htmlTouchBox.style.position = 'relative';
        this.htmlTouchBox.style.border = '2px solid black';
        this.htmlTouchBox.style.backgroundColor = 'white';
        this.htmlTouchBox.style.margin = '5px';

        this.htmlTouchBox.style.width = ( this.view.window.innerWidth
            - parseInt(this.htmlTouchBox.style.marginLeft)
            - parseInt(this.htmlTouchBox.style.borderLeftWidth)
            - parseInt(this.htmlTouchBox.style.marginRight)
            - parseInt(this.htmlTouchBox.style.borderRightWidth) )
            + 'px';

        this.htmlTouchBox.style.height = ( this.view.window.innerHeight
            - this.view.historyBox.htmlHistoryBox.offsetHeight
            - parseInt(this.htmlTouchBox.style.marginTop)
            - parseInt(this.htmlTouchBox.style.borderTop)
            - parseInt(this.htmlTouchBox.style.borderBottomWidth)
            - Math.max(parseInt(this.htmlTouchBox.style.marginBottom),parseInt(this.view.historyBox.htmlHistoryBox.style.marginTop))
            - parseInt(this.view.historyBox.htmlHistoryBox.style.marginBottom) )
            + 'px';

        this.htmlTouchBox.innerHTML = '<canvas id="pastTouches"></canvas><canvas id="presentTouches"></canvas><div id="targetBox"></div>';

        this.htmlPastTouches = document.getElementById('pastTouches');

        this.htmlPastTouches.style.position = 'absolute';
        this.htmlPastTouches.style.width = this.htmlTouchBox.style.width;
        this.htmlPastTouches.style.height = this.htmlTouchBox.style.height;

        this.htmlPresentTouches = document.getElementById('presentTouches');

        this.htmlPresentTouches.style.position = 'absolute';
        this.htmlPresentTouches.style.width = this.htmlTouchBox.style.width;
        this.htmlPresentTouches.style.height = this.htmlTouchBox.style.height;

        this.htmlTargetBox = document.getElementById('targetBox');

        this.htmlTargetBox.style.position = 'absolute';
        this.htmlTargetBox.style.width = parseInt(parseInt(this.htmlTouchBox.style.width)/2) + 'px';
        this.htmlTargetBox.style.height = parseInt(parseInt(this.htmlTouchBox.style.height)/2) + 'px';
        this.htmlTargetBox.style.borderRight = '1px solid black';
        this.htmlTargetBox.style.borderBottom = '1px solid black';

    };

    this.init();

};
