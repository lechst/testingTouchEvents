View = function(){

    this.init = function(){

        this.mainLayout();

        this.historyBox = new HistoryBox(this);
        this.infoBox = new InfoBox();
        this.touchBox = new TouchBox(this);

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

    this.setTouches = function(type,touch,target,changed){

    };

    this.init();

};
