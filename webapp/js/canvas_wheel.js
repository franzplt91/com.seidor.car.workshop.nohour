/*
Author: Rozario Chivers
Date: 27/07/2006

Reads area tags of an image map 
uses coords to plot polygons
for use in Canvas
*/
 
var canvasImageMap = {
	
	ctx : {},
	//rgb alpha stroke colour
	fillColour : "rgba(255,255,255,0.4)",
	lineWidth : 3,
	canvas : {},
	
	init : function() {
	// initialise map
		canvasImageMap.setUpMap();
		canvasImageMap.registerEvents();
	}, //end init	
	
	registerEvents : function() {
		// add mouseover / mouseout events
		$("#colourwheel area").bind("mouseover", function(e) {
				fillColour = "rgba(0,0,0,1)";
				strokeColour = canvasImageMap.calcularColor(e.target.id);

				canvasImageMap.drawRegion(this.coords, strokeColour, fillColour, true);
			}
		);
		
		$("#colourwheel area").bind("focus", function(e) {
				fillColour = "rgba(0,0,0,1)";
				strokeColour = canvasImageMap.calcularColor(e.target.id);

				canvasImageMap.drawRegion(this.coords, strokeColour, fillColour, true);
			}
		);
			
		$("#colourwheel area").bind("mouseout", function(e) {
				fillColour = "rgba(0,0,0,1)";
				strokeColour = canvasImageMap.calcularColor(e.target.id);

				canvasImageMap.drawRegion(this.coords, strokeColour, fillColour, true);
				//canvasImageMap.clearRegion(this.coords, this.shape);
			}
		);
		
		$("#colourwheel area").bind("blur", function(e) {
				fillColour = "rgba(255,255,255,1)";
				strokeColour = canvasImageMap.calcularColor(e.target.id);

				canvasImageMap.drawRegion(this.coords, strokeColour, fillColour, true);
				canvasImageMap.clearRegion(this.coords, this.shape);
			}
		);
		
		$("#colourwheel area").bind("click", function(e) {
				fillColour = "rgba(255,255,255,1)";
				strokeColour = canvasImageMap.calcularColor(e.target.id);

				canvasImageMap.drawRegion(this.coords, strokeColour, fillColour, false, true,e);
				//canvasImageMap.getPosition(e);
			}
		);
		
	},calcularColor: function(id){

		if(id === "RADIADOR_FRONTAL"){

			return "rgba(255, 0, 17, 1)";

		}

		if(id === "FARO_IZQ_FRONTAL" || id === "FARO_DER_FRONTAL"){

			return "rgba(150, 101, 17, 1)";

		}


		if(id === "CAPO_FRONTAL"){

			return "rgba(0, 205, 91, 1)";

		}

		if(id === "ESPEJO_IZQ_FRONTAL" || id === "ESPEJO_DER_FRONTAL"){

			return "rgba(0, 205, 255, 1)";

		}


		if(id === "RUEDA_IZQ_FRONTAL" || id === "RUEDA_DER_FRONTAL"){

			return "rgba(167, 75, 255, 1);";

		}

		if(id === "RUEDA_IZQ_FRONTAL" || id === "RUEDA_DER_FRONTAL"){

			return "rgba(167, 75, 255, 1);";

		}


		if(id === "PARA_BRISAS_FRONTAL"){

			return "rgba(255, 210, 0, 1);";

		}

		return "rgba(0, 0, 0, 0.1)";


	}, // end registerEvents

	setUpMap : function() {
		//set canvas area	
		// get the canvas element
		canvasImageMap.canvas = $("#area")[0];
		// use getContext to use the canvas for drawing
		canvasImageMap.ctx = canvasImageMap.canvas.getContext("2d");
		canvasImageMap.ctx.fillStyle = canvasImageMap.fillColour;
		canvasImageMap.ctx.lineWidth = canvasImageMap.lineWidth;
	},
	
	drawRegion : function(coords, strokeColour, fillColour, stroke, fill,event) {
		// populate with parsed values
		var coordsRef = coords.split(",");
		
		var regionLength = coordsRef.length;
		canvasImageMap.ctx.save();
		canvasImageMap.ctx.strokeStyle = strokeColour;
		canvasImageMap.ctx.fillStyle = fillColour;
		canvasImageMap.ctx.beginPath();
		//move to start point
		canvasImageMap.ctx.moveTo( coordsRef[0], coordsRef[1] ) ;
			for( var i=0; i < regionLength; i++ ) {
				if(i % 2 == 0 && i > 1) {
					//plot remaining x y pairs
					canvasImageMap.ctx.lineTo(coordsRef[i],coordsRef[i+1]);
				}
		}
		
		canvasImageMap.ctx.closePath();
		
		if (stroke) canvasImageMap.ctx.stroke();
		if (fill){

		    var x = event.clientX; // x == the location of the click in the document - the location (relative to the left) of the canvas in the document
		    var y = event.clientY;
		    var pointSize = 5;
		    //ctx.fillStyle = "#ff2626";
		    canvasImageMap.ctx.fill();
			canvasImageMap.ctx.fillStyle = "#ff2626"; // Red color
		    canvasImageMap.ctx.beginPath(); //Start path
		    canvasImageMap.ctx.arc(x, y, pointSize, 0, Math.PI * 2, true);
		    canvasImageMap.ctx.fill();

		} 
		
		canvasImageMap.ctx.restore();
	}, // end drawRegion	
	
	clearRegion : function(coords,shapeRef) {
		//clear 
		canvasImageMap.ctx.clearRect(0, 0, $(canvasImageMap.canvas).height(), $(canvasImageMap.canvas).width() );
	}
} // end canvasImageMap
    
	



	  
  
	  
  

