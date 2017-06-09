sap.ui.define([], function () {
    "use strict";
    return {

        ctx: {},
        //rgb alpha stroke colour
        fillColour: "rgba(255,255,255,0.7)",
        lineWidth: 3,
        canvas: {},

        init: function (callback) {
            // initialise map
            this.setUpMap();
            this.registerEvents(callback);
        }, //end init   

        registerEvents: function (callback) {
            var self = this;
            $("#colourwheel area").bind("mouseover", function (e) {

                var fillColour = "rgba(255,255,255,0.5)";
                var strokeColour = self.calcularColor(e.target.id);

                //self.drawRegion(this.coords, strokeColour, fillColour, true);
            }
            );

            $("#colourwheel area").bind("focus", function (e) {
                var fillColour = "rgba(255,255,255,0.5)";
                var strokeColour = self.calcularColor(e.target.id);

                //self.drawRegion(this.coords, strokeColour, fillColour, true);
            }
            );

            $("#colourwheel area").bind("mouseout", function (e) {
                var fillColour = "rgba(255,255,255,0.5)";
                var strokeColour = self.calcularColor(e.target.id);

                //self.drawRegion(this.coords, strokeColour, fillColour, true);
                //canvasImageMap.clearRegion(this.coords, this.shape);
            }
            );

            $("#colourwheel area").bind("blur", function (e) {
                var fillColour = "rgba(255,255,255,0.5)";
                var strokeColour = self.calcularColor(e.target.id);

                //self.drawRegion(this.coords, strokeColour, fillColour, true);
                //self.clearRegion(this.coords, this.shape);
            }
            );

            $("#colourwheel area").bind("click", function (e) {

                window.PointEvent = e;
                window.CanvasVistaFrontal = self;

                callback(this);

                self.drawPoint(e);

                //canvasImageMap.getPosition(e);
            }
            );

        }, calcularColor: function (id) {

            return "rgba(255, 255, 255, 0.1)";

        }, // end registerEvents

        setUpMap: function () {
            //set canvas area   
            // get the canvas element
            this.canvas = $("#area")[0];
            // use getContext to use the canvas for drawing
            this.ctx = this.canvas.getContext("2d");
            this.ctx.fillStyle = this.fillColour;
            this.ctx.lineWidth = this.lineWidth;
            var self = this;
            $("#colourwheel area").each(function (index) {
                self.drawRegion(this.coords, "rgba(103, 155, 255, 0.5)", "rgba(103, 155, 255, 0.3)", true, true);
            });
        },

        drawRegion: function (coords, strokeColour, fillColour, stroke, fill, event) {
            // populate with parsed values
            var coordsRef = coords.split(",");

            var regionLength = coordsRef.length;
            this.ctx.save();
            this.ctx.strokeStyle = "rgba(103, 155, 255, 0.3)";
            this.ctx.fillStyle = "rgba(103, 155, 255, 0.3)";
            this.ctx.beginPath();
            //move to start point
            this.ctx.moveTo(coordsRef[0], coordsRef[1]);
            for (var i = 0; i < regionLength; i++) {
                if (i % 2 === 0 && i > 1) {
                    //plot remaining x y pairs
                    this.ctx.lineTo(coordsRef[i], coordsRef[i + 1]);
                }
            }

            this.ctx.closePath();

            if (stroke)
                this.ctx.stroke();
            if (fill) {
                this.ctx.fill();
            }

            this.ctx.restore();
        },
        drawPoint: function (event) {

            var x = event.offsetX; // x == the location of the click in the document - the location (relative to the left) of the canvas in the document
            var y = event.offsetY;
            var pointSize = 5;
            //ctx.fillStyle = "#ff2626";
            // this.ctx.fill();
            this.ctx.fillStyle = "#ff2626"; // Red color
            this.ctx.beginPath(); //Start path
            this.ctx.arc(x, y, pointSize, 0, Math.PI * 2, true);
            this.ctx.fill();



        }, // end drawRegion    

        clearRegion: function (coords, shapeRef) {
            //clear 
            this.ctx.clearRect(0, 0, 640, 513);
            var self = this;
            $("#colourwheel area").each(function (index) {
                self.drawRegion(this.coords, "rgba(103, 155, 255, 0.5)", "rgba(103, 155, 255, 0.3)", true, true);
            });
        },
        clearPoint: function (coordenadas) {
            //clear
            var event = window.PointEvent;
            this.ctx.fillStyle = "rgba(103, 155, 255, 0.5)"; // Red color

            if (!coordenadas) {
                this.ctx.clearRect(event.offsetX - 5, event.offsetY - 5, 10, 10);
                this.ctx.beginPath();
                this.ctx.rect(event.offsetX - 5, event.offsetY - 5, 10, 10);
            } else {
                this.ctx.clearRect(coordenadas.X - 5, coordenadas.Y - 5, 10, 10);
                this.ctx.beginPath();
                this.ctx.rect(coordenadas.X - 5, coordenadas.Y - 5, 10, 10);
            }

            this.ctx.fill();
        },
        printInspeccion: function () {
            html2canvas(document.getElementById("colourwheel"), {
                onrendered: function (canvas) {

                    document.getElementById("preview_inspeccion").innerHTML = "";
                    document.getElementById("preview_inspeccion").appendChild(canvas);
                    sap.ui.core.BusyIndicator.hide();
                }
            });
        }


    };

});