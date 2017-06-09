sap.ui.define([	], function () {
    "use strict";
    return {

    ctx : {},
    //rgb alpha stroke colour
    fillColour : "rgba(255,255,255,0.4)",
    lineWidth : 3,
    canvas : {},
    
    init : function(callback) {
    // initialise map
        this.setUpMap();
        this.registerEvents(callback);
    }, //end init   
    
    registerEvents : function(callback) {
        var self = this;
        $("#canvas_div_parte_trasera area").bind("mouseover", function(e) {
                var fillColour = "rgba(255,255,255,0.5)";
                var strokeColour = self.calcularColor(e.target.id);

                self.drawRegion(this.coords, strokeColour, fillColour, true);
            }
        );
        
        $("#canvas_div_parte_trasera area").bind("focus", function(e) {
                var fillColour = "rgba(255,255,255,0.5)";
                var strokeColour = self.calcularColor(e.target.id);

                self.drawRegion(this.coords, strokeColour, fillColour, true);
            }
        );
            
        $("#canvas_div_parte_trasera area").bind("mouseout", function(e) {
                var fillColour = "rgba(255,255,255,0.5)";
                var strokeColour = self.calcularColor(e.target.id);

                self.drawRegion(this.coords, strokeColour, fillColour, true);
                //canvasImageMap.clearRegion(this.coords, this.shape);
            }
        );
        
        $("#canvas_div_parte_trasera area").bind("blur", function(e) {
                var fillColour = "rgba(255,255,255,0.5)";
                var strokeColour = self.calcularColor(e.target.id);

                self.drawRegion(this.coords, strokeColour, fillColour, true);
                self.clearRegion(this.coords, this.shape);
            }
        );
        
        $("#canvas_div_parte_trasera area").bind("click", function(e) {
                var fillColour = "rgba(103, 155, 255, 0.3)";
                var strokeColour = self.calcularColor(e.target.id);
				callback(this);
                self.drawRegion(this.coords, strokeColour, fillColour, false, true,e);
                //canvasImageMap.getPosition(e);
            }
        );
        
    },calcularColor: function(id){

        return "rgba(0, 0, 0, 0.1)";


    }, // end registerEvents

    setUpMap : function() {
        //set canvas area   
        // get the canvas element
        this.canvas = $("#canvas_parte_trasera")[0];
        // use getContext to use the canvas for drawing
        this.ctx = this.canvas.getContext("2d");
        this.ctx.fillStyle = this.fillColour;
        this.ctx.lineWidth = this.lineWidth;
    },
    
    drawRegion : function(coords, strokeColour, fillColour, stroke, fill,event) {
        // populate with parsed values
        var coordsRef = coords.split(",");
        
        var regionLength = coordsRef.length;
        this.ctx.save();
        this.ctx.strokeStyle = strokeColour;
        this.ctx.fillStyle = fillColour;
        this.ctx.beginPath();
        //move to start point
        this.ctx.moveTo( coordsRef[0], coordsRef[1] ) ;
            for( var i=0; i < regionLength; i++ ) {
                if(i % 2 === 0 && i > 1) {
                    //plot remaining x y pairs
                    this.ctx.lineTo(coordsRef[i],coordsRef[i+1]);
                }
        }
        
        this.ctx.closePath();
        
        if (stroke) this.ctx.stroke();
        if (fill){

            var x = event.offsetX; // x == the location of the click in the document - the location (relative to the left) of the canvas in the document
            var y = event.offsetY;
            var pointSize = 5;
            //ctx.fillStyle = "#ff2626";
            //this.ctx.fill();
            this.ctx.fillStyle = "#ff2626"; // Red color
            this.ctx.beginPath(); //Start path
            this.ctx.arc(x, y, pointSize, 0, Math.PI * 2, true);
            this.ctx.fill();

        } 
        
        this.ctx.restore();
    }, // end drawRegion    
    
    clearRegion : function(coords,shapeRef) {
        //clear 
        this.ctx.clearRect(0, 0, 499, 328 );
    }
  
    	
   };

});