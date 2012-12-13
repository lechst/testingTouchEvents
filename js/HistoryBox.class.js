HistoryBox = function(view){

    this.view = view;

    this.init = function(){

        this.historyBoxLayout();

    };

    this.historyBoxLayout = function(){

        this.htmlHistoryBox = document.getElementById('historyBox');
        this.htmlHistoryBox.innerHTML = '<canvas id="historyLine"></canvas><div id="toolsBox"></div>';

        this.htmlHistoryBox.style.position = 'relative';
        this.htmlHistoryBox.style.backgroundColor = 'white';
        this.htmlHistoryBox.style.height = '74px';
        this.htmlHistoryBox.style.margin = '5px';
        this.htmlHistoryBox.style.border = '2px solid black';
        this.htmlHistoryBox.style.borderBottom = '2px solid gray';

        this.htmlHistoryBox.style.width = ( this.view.window.innerWidth
            - parseInt(this.htmlHistoryBox.style.marginLeft)
            - parseInt(this.htmlHistoryBox.style.borderLeftWidth)
            - parseInt(this.htmlHistoryBox.style.marginRight)
            - parseInt(this.htmlHistoryBox.style.borderRightWidth) )
            + 'px';

        this.htmlHistoryLine = document.getElementById('historyLine');

        this.htmlHistoryLine.style.position = 'absolute';
        this.htmlHistoryLine.style.top = '0px';
        this.htmlHistoryLine.style.left = '0px';
        this.htmlHistoryLine.style.backgroundColor = 'white';
        this.htmlHistoryLine.style.height = '40px';
        this.htmlHistoryLine.style.width = this.htmlHistoryBox.style.width;

        this.htmlHistoryLine.width = this.htmlHistoryLine.offsetWidth;
        this.htmlHistoryLine.height = this.htmlHistoryLine.offsetHeight;
        this.ctxHistoryLine = this.htmlHistoryLine.getContext('2d');

        this.htmlToolsBox = document.getElementById('toolsBox');

        this.htmlToolsBox.style.position = 'absolute';
        this.htmlToolsBox.style.bottom = '0px';
        this.htmlToolsBox.style.left = '0px';
        this.htmlToolsBox.style.backgroundColor = 'gray';
        this.htmlToolsBox.style.height = '32px';
        this.htmlToolsBox.style.width = this.htmlHistoryBox.style.width;
        this.htmlToolsBox.style.borderTop = '2px solid black';

        this.htmlToolsBox.innerHTML = '<div id="resetBox"></div><div id="scrollCanvasDiv"></div><canvas id="scrollCanvas"></canvas><div id="infoBox"></div>';

        this.htmlResetBox = document.getElementById('resetBox');

        this.htmlResetBox.style.position = 'absolute';
        this.htmlResetBox.style.top = '0px';
        this.htmlResetBox.style.left = '0px';
        this.htmlResetBox.style.backgroundColor = 'white';
        this.htmlResetBox.style.height = this.htmlToolsBox.style.height;
        this.htmlResetBox.style.width = this.htmlToolsBox.style.height;
        this.htmlResetBox.style.borderRight = '2px solid black';
        this.htmlResetBox.style.borderBottom = '2px solid black';

        this.htmlResetBox.innerHTML = '<p class="reset">X<p>';

        this.htmlResetP = document.getElementsByClassName('reset')[0];
        this.htmlResetP.style.width = this.htmlResetBox.style.height;
        this.htmlResetP.style.height = parseInt(parseInt(this.htmlResetBox.style.height)/2) + 'px';
        this.htmlResetP.style.marginTop = parseInt(parseInt(this.htmlResetBox.style.height)/4-2) + 'px';
        this.htmlResetP.style.marginBottom = parseInt(parseInt(this.htmlResetBox.style.height)/4) + 'px';
        this.htmlResetP.style.padding = '0px';
        this.htmlResetP.style.textAlign = 'center';
        this.htmlResetP.style.fontSize = parseInt(this.htmlResetP.style.height)+'px';

        this.htmlInfoBox = document.getElementById('infoBox');

        this.htmlInfoBox.style.position = 'absolute';
        this.htmlInfoBox.style.border = '2px solid black';
        this.htmlInfoBox.style.bottom = (-parseInt(this.htmlInfoBox.style.borderBottomWidth)) + 'px';
        this.htmlInfoBox.style.right = (-parseInt(this.htmlInfoBox.style.borderRightWidth)) + 'px';
        this.htmlInfoBox.style.backgroundColor = 'white';
        this.htmlInfoBox.style.height = this.htmlToolsBox.style.height;
        this.htmlInfoBox.style.width = this.htmlToolsBox.style.height;

        this.htmlScrollCanvas = document.getElementById('scrollCanvas');

        this.htmlScrollCanvas.style.position = 'absolute';
        this.htmlScrollCanvas.style.top = '0px';
        this.htmlScrollCanvas.style.marginLeft = '5px';
        this.htmlScrollCanvas.style.marginRight = '5px';
        this.htmlScrollCanvas.style.borderRight = '2px solid black';
        this.htmlScrollCanvas.style.borderBottom = '2px solid black';
        this.htmlScrollCanvas.style.borderLeft = '2px solid black';
        this.htmlScrollCanvas.style.left = ( parseInt(this.htmlResetBox.style.width)
            + parseInt(this.htmlResetBox.style.borderRightWidth) ) + 'px';
        this.htmlScrollCanvas.style.width = ( parseInt(this.htmlToolsBox.style.width)
            - parseInt(this.htmlInfoBox.style.width)
            - parseInt(this.htmlInfoBox.style.borderLeftWidth)
            - parseInt(this.htmlResetBox.style.width)
            - parseInt(this.htmlResetBox.style.borderRightWidth)
            - parseInt(this.htmlScrollCanvas.style.marginLeft)
            - parseInt(this.htmlScrollCanvas.style.marginRight)
            - parseInt(this.htmlScrollCanvas.style.borderLeftWidth)
            - parseInt(this.htmlScrollCanvas.style.borderRightWidth) ) + 'px';
        this.htmlScrollCanvas.style.height = this.htmlToolsBox.style.height;

        this.htmlScrollCanvas.width = this.htmlScrollCanvas.offsetWidth;
        this.htmlScrollCanvas.height = this.htmlScrollCanvas.offsetHeight;
        this.ctxScrollCanvas = this.htmlScrollCanvas.getContext('2d');

        this.htmlScrollCanvasDiv = document.getElementById('scrollCanvasDiv');

        this.htmlScrollCanvasDiv.style.position = 'absolute';
        this.htmlScrollCanvasDiv.style.top = '0px';
        this.htmlScrollCanvasDiv.style.marginLeft = '5px';
        this.htmlScrollCanvasDiv.style.marginRight = '5px';
        this.htmlScrollCanvasDiv.style.borderRight = '2px solid black';
        this.htmlScrollCanvasDiv.style.borderBottom = '2px solid black';
        this.htmlScrollCanvasDiv.style.borderLeft = '2px solid black';
        this.htmlScrollCanvasDiv.style.left = ( parseInt(this.htmlResetBox.style.width)
            + parseInt(this.htmlResetBox.style.borderRightWidth) ) + 'px';
        this.htmlScrollCanvasDiv.style.backgroundColor = 'white';
        this.htmlScrollCanvasDiv.style.width = ( parseInt(this.htmlToolsBox.style.width)
            - parseInt(this.htmlInfoBox.style.width)
            - parseInt(this.htmlInfoBox.style.borderLeftWidth)
            - parseInt(this.htmlResetBox.style.width)
            - parseInt(this.htmlResetBox.style.borderRightWidth)
            - parseInt(this.htmlScrollCanvasDiv.style.marginLeft)
            - parseInt(this.htmlScrollCanvasDiv.style.marginRight)
            - parseInt(this.htmlScrollCanvasDiv.style.borderLeftWidth)
            - parseInt(this.htmlScrollCanvasDiv.style.borderRightWidth) ) + 'px';
        this.htmlScrollCanvasDiv.style.height = this.htmlToolsBox.style.height;

        this.htmlScrollCanvasDiv.innerHTML = '<div id="leftDiv"></div><div id="scrollDiv"></div><div id="rightDiv"></div>';

        this.htmlLeftDiv = document.getElementById('leftDiv');

        this.htmlLeftDiv.style.position = 'absolute';
        this.htmlLeftDiv.style.top = '0px';
        this.htmlLeftDiv.style.left = '0px';
        this.htmlLeftDiv.style.height = this.htmlToolsBox.style.height;
        this.htmlLeftDiv.style.width = this.htmlToolsBox.style.height;
        this.htmlLeftDiv.style.borderRight = '2px solid black';

        this.htmlScrollDiv = document.getElementById('scrollDiv');

        this.htmlScrollDiv.style.position = 'absolute';
        this.htmlScrollDiv.style.top = parseInt(parseInt(this.htmlToolsBox.style.height)/4) + 'px';
        this.htmlScrollDiv.style.left = 2*parseInt(this.htmlToolsBox.style.height) + 'px';
        this.htmlScrollDiv.style.height = parseInt(parseInt(this.htmlToolsBox.style.height)/2) + 'px';
        this.htmlScrollDiv.style.width = parseInt(parseInt(this.htmlToolsBox.style.height)/2) + 'px';
        this.htmlScrollDiv.style.borderRadius = parseInt(parseInt(this.htmlToolsBox.style.height)/4) + 'px';
        this.htmlScrollDiv.style.backgroundColor = 'black';

        this.htmlRightDiv = document.getElementById('rightDiv');

        this.htmlRightDiv.style.position = 'absolute';
        this.htmlRightDiv.style.top = '0px';
        this.htmlRightDiv.style.right = '0px';
        this.htmlRightDiv.style.height = this.htmlToolsBox.style.height;
        this.htmlRightDiv.style.width = this.htmlToolsBox.style.height;
        this.htmlRightDiv.style.borderLeft = '2px solid black';

        this.drawTrigger();

    };

    this.parameters = {height: 30, width: 10, spaceTop: 5, spaceBottom: 5, spaceBetween: 10};

    this.events = [];

    this.current = -1;

    this.setEvent = function(type){
        this.events.push(type);
        var l = this.events.length;
        this.current = l-1;
        this.drawEvents();
    };

    this.drawTrigger = function(){

        var ctx = this.ctxHistoryLine;
        var cnvs = this.htmlHistoryLine;

        ctx.beginPath();
        ctx.moveTo(cnvs.width/2-5,0);
        ctx.lineTo(cnvs.width/2,10);
        ctx.moveTo(cnvs.width/2,10);
        ctx.lineTo(cnvs.width/2+5,0);
        ctx.lineWidth = 2;
        ctx.strokeStyle = 'black';
        ctx.stroke();

    };

    this.drawEvents = function(){

        var ctx = this.ctxHistoryLine;
        var cnvs = this.htmlHistoryLine;
        var x0 = cnvs.width/2;
        var y0 = this.parameters.spaceTop;
        var h = this.parameters.height;
        var w = this.parameters.width;
        var s = this.parameters.spaceBetween;

        var l = this.events.length;
        var cId = this.current;

        ctx.clearRect(0,y0,2*x0,h);

        for(var i=0; i < l; i++){

            var x = (i - cId) * (w + s) + x0 - w/2;
            var y = y0;
            var type = this.events[i];
            var clr = this.view.touchBox.drawTouch.parameters[type+'Color'];
            ctx.beginPath();
            ctx.fillStyle = clr;
            ctx.fillRect(x,y,w,h);

        }

        this.drawTrigger();

    };

    this.changeCurrent = function(id){

        this.current = id;

    };

    this.showCurrent = function(){

    };

    this.init();

};

