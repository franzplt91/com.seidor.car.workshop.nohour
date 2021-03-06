sap.ui.define([
	"sap/ui/model/json/JSONModel",
	"sap/ui/Device",
	"pe/seidor/sap/comagenda_vehiculo/model/models"
], function(JSONModel, Device, models) {
	"use strict";

	return {

		parseFecha: function(cad) {
			var dateParts = cad.split(" ");
			var fecha = dateParts[0].split("/");
			return fecha[0] + "/" + fecha[1] + "/" + fecha[2];
		},
		parseHora: function(cad, second) {
			var dateParts = cad.split(" ");
			var hora = dateParts[1].split(":");
			if (!second) {
				return hora[0] + ":" + hora[1];
			}

			return hora[0] + ":" + hora[1] + ":" + hora[2];

		},
		parseBoolean: function(valor, ValorSi) {
			return valor === ValorSi;
		},
		parseFechaInArray: function(data, campo_parse, campo_result) {

			for (var i = 0; i < data.length; i++) {

				data[i][campo_result] = this.parseFecha(data[i][campo_parse]);

			}

			return data;

		},
		parseHoraInArray: function(data, campo_parse, campo_result) {

			for (var i = 0; i < data.length; i++) {

				data[i][campo_result] = this.parseHora(data[i][campo_parse]);

			}

			return data;

		},
		parseBooleanInArray: function(data, campo_parse, campo_result, valorSi) {

			for (var i = 0; i < data.length; i++) {

				data[i][campo_result] = this.parseBoolean(data[i][campo_parse], valorSi);

			}

			return data;

		},
		readTextFile: function(file, callback) {
			var rawFile = new XMLHttpRequest();
			rawFile.open("GET", "file://" +file, false);
			rawFile.onreadystatechange = function() {
				if (rawFile.readyState === 4) {
					if (rawFile.status === 200 || rawFile.status === 0) {
						var allText = rawFile.responseText;
						callback(allText);
					}
				}
			};
			
			rawFile.send(null);
		},
		htmlCanvasCar: function(){
			return "<div class=\"map-vehiculo\" id=\"colourwheel\">\n                <map name=\"colourwheel\">\n                    <area  alt=\"001\" title=\"001\"  coords=\"388,461,379,423,379,402,383,379,388,358,412,362,429,363,452,364,473,365,507,363,512,380,513,398,515,413,513,429,511,444,507,457,470,457,409,458\" shape=\"poly\">\n                    <area  alt=\"002\" title=\"002\"  coords=\"325,477,335,476,350,472,370,467,387,462,381,438,377,420,379,399,382,380,386,365,388,358,371,355,356,350,340,346,327,342,319,353,313,362,309,378,307,396,306,414,309,437,314,458,317,468\" shape=\"poly\">\n                    <area  alt=\"028\" title=\"028\"  coords=\"507,458,526,460,543,463,560,466,567,456,573,444,575,430,575,405,574,381,566,363,559,355,541,358,520,362,508,363,511,379,515,397,515,422,511,442\" shape=\"poly\">\n                    <area  alt=\"025\" title=\"025\"  coords=\"559,466,575,466,604,466,608,455,612,442,614,421,613,392,609,372,605,355,562,357,573,373,575,399,575,433,569,456\" shape=\"poly\">\n                    <area  alt=\"004\" title=\"004\"  coords=\"231,473,259,478,273,478,290,480,311,479,323,478,313,460,307,433,305,410,307,394,309,379,313,361,319,348,326,342,295,342,272,343,243,346,232,346,226,352,222,361,219,369,213,373,215,379,213,388,212,402,212,418,214,432,215,442,220,455,226,466\" shape=\"poly\">\n                    <area  alt=\"025\" title=\"025\"  coords=\"42,209,52,246,141,246,153,209,101,206,59,206\" shape=\"poly\">\n                    <area  alt=\"028\" title=\"028\"  coords=\"39,208,49,181,141,181,149,208\" shape=\"poly\">\n                    <area  alt=\"029\" title=\"029\"  coords=\"15,245,173,247,173,260,169,270,164,282,149,279,132,279,119,277,97,277,74,277,54,276,35,276,25,281,18,269\" shape=\"poly\">\n                    <area  alt=\"022\" title=\"022\"  coords=\"20,227,35,224,44,227,49,237,34,237,23,232\" shape=\"poly\">\n                    <area  alt=\"021\" title=\"021\"  coords=\"146,228,157,226,168,226,168,230,161,236,144,236\" shape=\"poly\">\n                    <area  alt=\"016\" title=\"016\"  coords=\"15,264,17,279,17,301,34,302,35,279,25,284\" shape=\"poly\">\n                    <area  alt=\"015\" title=\"015\"  coords=\"154,281,154,303,169,305,173,300,173,281,173,264,166,278,161,281\" shape=\"poly\">\n                    <area  alt=\"004\" title=\"004\"  coords=\"28,54,32,69,44,72,54,72,60,79,65,86,79,87,104,87,122,87,127,77,141,74,156,72,161,54,129,50,77,49,40,50\" shape=\"poly\">\n                    <area  alt=\"002\" title=\"002\"  coords=\"28,52,47,17,142,17,154,37,159,52,95,47\" shape=\"poly\">\n                    <area  alt=\"005\" title=\"005\"  coords=\"25,73,37,72,56,73,61,78,61,83,44,85,30,80\" shape=\"poly\">\n                    <area  alt=\"006\" title=\"006\"  coords=\"127,82,137,85,151,85,163,80,163,75,149,72,136,73\" shape=\"poly\">\n                    <area  alt=\"003\" title=\"003\"  coords=\"15,84,22,83,35,84,60,86,67,91,90,91,121,89,129,88,161,86,171,83,173,94,171,111,166,121,154,123,136,123,111,123,84,121,55,121,40,121,23,121,15,101\" shape=\"poly\">\n                    <area  alt=\"026\" title=\"026\"  coords=\"8,51,8,42,23,41,27,48\" shape=\"poly\">\n                    <area  alt=\"027\" title=\"027\"  coords=\"164,42,181,42,183,54,163,52\" shape=\"poly\">\n                    <area  alt=\"007\" title=\"007\"  coords=\"17,104,22,121,34,122,32,139,15,137,15,124\" shape=\"poly\">\n                    <area  alt=\"008\" title=\"008\"  coords=\"174,101,168,119,154,124,156,139,174,139,173,120\" shape=\"poly\">\n                    <area  alt=\"008\" title=\"008\"  coords=\"266,100,273,85,286,77,305,77,320,87,327,103,325,118,318,127,307,135,290,137,271,125,265,112\" shape=\"poly\">\n                    <area  alt=\"007\" title=\"007\"  coords=\"530,247,543,240,558,240,568,245,575,254,580,264,580,275,575,287,565,298,543,301,528,292,521,279,520,264\" shape=\"poly\">\n                    <area  alt=\"015\" title=\"015\"  coords=\"276,254,286,245,300,239,310,242,320,245,325,252,330,260,333,272,330,284,323,292,315,299,302,301,290,299,280,291,273,281,271,267\" shape=\"poly\">\n                    <area  alt=\"016\" title=\"016\"  coords=\"518,88,528,80,545,77,555,78,561,83,568,90,571,98,573,107,571,118,565,127,556,134,546,137,534,137,521,130,514,115,513,105\" shape=\"poly\">\n                    <area  alt=\"009\" title=\"009\"  coords=\"400,211,501,216,506,245,504,272,405,270,405,238\" shape=\"poly\">\n                    <area  alt=\"010\" title=\"010\"  coords=\"342,54,374,50,402,50,442,49,439,107,340,107\" shape=\"poly\">\n                    <area  alt=\"011\" title=\"011\"  coords=\"397,175,405,212,499,217,483,202,466,190,442,180,419,175\" shape=\"poly\">\n                    <area  alt=\"012\" title=\"012\"  coords=\"343,51,439,48,447,11,405,13,374,28\" shape=\"poly\">\n                    <area  alt=\"017\" title=\"017\"  coords=\"323,208,397,212,404,227,405,270,340,270,337,250,320,235\" shape=\"poly\">\n                    <area  alt=\"018\" title=\"018\"  coords=\"439,107,504,105,508,89,516,79,524,70,524,55,519,44,444,49\" shape=\"poly\">\n                    <area  alt=\"019\" title=\"019\"  coords=\"338,182,352,177,369,175,390,175,397,212,323,207\" shape=\"poly\">\n                    <area  alt=\"020\" title=\"020\"  coords=\"449,45,545,45,533,33,518,23,504,16,486,11,467,11,454,9\" shape=\"poly\">\n                    <area  alt=\"003\" title=\"003\"  coords=\"580,245,596,245,620,246,633,251,632,263,632,273,615,273,588,273\" shape=\"poly\">\n                    <area  alt=\"003\" title=\"003\"  coords=\"211,87,221,83,243,82,265,82,258,92,255,108,213,110\" shape=\"poly\">\n                    <area  alt=\"029\" title=\"029\"  coords=\"278,241,270,251,265,265,261,277,216,272,213,250,216,241\" shape=\"poly\">\n                    <area  alt=\"029\" title=\"029\"  coords=\"566,77,576,87,583,104,583,112,625,107,632,104,628,101,632,87,625,75\" shape=\"poly\">\n                    <area  alt=\"030\" title=\"030\"  coords=\"228,208,268,207,281,200,323,180,335,177,345,177,323,188,312,197,298,208,308,210,322,210,318,235,305,232,293,235,278,240,223,240\" shape=\"poly\">\n                    <area  alt=\"031\" title=\"031\"  coords=\"523,47,545,45,534,32,519,22,504,15,493,10,516,15,531,17,543,25,555,30,568,39,581,42,596,44,612,44,617,45,618,54,622,64,620,74,598,75,576,75,563,74,548,69,526,70\" shape=\"poly\">\n                <\/map> \n                <canvas id=\"area\" height = \"513\" width=\"640\" ><\/canvas>\n            <\/div>       \n            <img src=\"images/transparent.gif\"   height = \"513\" width=\"640\"  border=\"0\" class=\"colourwheel\" usemap=\"#colourwheel\">";
		}

	};
});