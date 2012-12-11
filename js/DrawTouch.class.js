DrawTouch = function(){

    this.parameters = {radius: 20, width: 5, pastAlpha: 0.2, presentAlpha: 1,
        startColor: 'hsl(120,100%,50%)', moveColor: 'hsl(60,100%,50%)', endColor: 'hsl(0,100%,50%)'
    };

    this.events = [];

    this.setEvents = function(type,touch,target,changed){
        this.events.push({type: type, touch: touch, target: target, changed: changed});
    };

    this.drawTouch = function(x,y,type,ctx){
        var clr = this.parameters[type+'Color'];
        var r = this.parameters.radius;

        ctx.beginPath();
        ctx.arc(x, y, r, 0, 2*Math.PI, false);
        ctx.fillStyle = clr;
        ctx.fill();
    };

    this.drawTarget = function(x,y,type,ctx){
        var clr = 'white';
        var r = this.parameters.radius - this.parameters.width;
        var w = this.parameters.width;

        ctx.beginPath();
        ctx.moveTo(x-r,y);
        ctx.lineTo(x+r,y);
        ctx.moveTo(x,y-r);
        ctx.lineTo(x,y+r);
        ctx.lineWidth = w;
        ctx.strokeStyle = clr;
        ctx.stroke();
    };

    this.drawChanged = function(x,y,type,ctx){
        var clr = this.parameters[type+'Color'];
        var r = this.parameters.radius + this.parameters.width/2;
        var w = this.parameters.width;

        ctx.lineWidth = w;
        ctx.strokeStyle = clr;

        for(var i=0; i<8; i++){
            ctx.beginPath();
            ctx.arc(x, y, r, (4*i+1)*Math.PI/16, (4*i+3)*Math.PI/16, false);
            ctx.stroke();
        }
    };

    this.loopTouches = function(touchType,type,ctx,touchArray){
        var l = touchArray.length;

        for(var i=0; i<l; i++){
            var x = touchArray[i][0];
            var y = touchArray[i][1];
            this['draw'+touchType](x,y,type,ctx);
        }
    };

    this.drawPast = function(type,ctx,changed){

        if(type=='move'){
            ctx.globalAlpha = this.parameters.pastAlpha/10;
        } else {
            ctx.globalAlpha = this.parameters.pastAlpha;
        }

        this.loopTouches('Touch',type,ctx,changed);

    };

    this.drawPresent = function(type,ctx,touch,target,changed){

        ctx.globalAlpha = this.parameters.presentAlpha;

        this.loopTouches('Touch',type,ctx,touch);
        this.loopTouches('Target',type,ctx,target);
        this.loopTouches('Changed',type,ctx,changed);

    };

    this.clearCanvas = function(canvas,context){

        context.clearRect(0,0,canvas.width,canvas.height);

    };

};
