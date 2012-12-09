DrawTouch = function(){

    this.parameters = {radius: 20, width: 5, pastAlpha: 0.5, presentAlpha: 0.8,
        startColor: 'hsl(120,100%,50%)', moveColor: 'hsl(60,100%,50%)', endColor: 'hsl(0,100%,50%)'
    };

    this.events = [];

    this.setEvents = function(type,touch,target,changed){

    };

    this.drawTouch = function(type,ctx){

    };

    this.drawTarget = function(type,ctx){

    };

    this.drawChanged = function(type,ctx){

    };

    this.drawPast = function(type,ctx,changed){

    };

    this.drawPresent = function(type,ctx,touch,target,changed){

    };

    this.clear = function(ctx){

    };

};
