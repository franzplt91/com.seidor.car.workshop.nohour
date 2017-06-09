sap.ui.define([
	"sap/ui/model/json/JSONModel",
	"sap/ui/Device",
	"pe/seidor/sap/comagenda_vehiculo/model/models",
	"pe/seidor/sap/comagenda_vehiculo/util/utilFunctions"
], function(JSONModel, Device, models,utilFunctions) {
	"use strict";

	return {
		stringModel : "/Agenda",
		genNameService : function(cad){
			return "agendaService." + cad;
		},
		getListAll2: function(callback) {
			
			return models.modelHXRead(this.stringModel,this.genNameService("getListAll"),callback);
			
		},
		getListAll: function(callback) {
			
			return models.modelHXRead("/VistaAgenda?$filter= RECEPCION_ID eq null",this.genNameService("getListAll"),function(result){
				
				if(result.c === "s"){
					result.data = utilFunctions.parseFechaInArray(result.data,"AGENDA_FECHA_INICIO","FECHA_CITA");
					result.data = utilFunctions.parseHoraInArray(result.data,"AGENDA_FECHA_INICIO","HORA_CITA");
					result.data = utilFunctions.parseHoraInArray(result.data,"AGENDA_FECHA_FIN","HORA_TOLERANCIA");
					result.data = utilFunctions.parseBooleanInArray(result.data,"CLIENTE_IS_EMPRESA","IS_EMPRESA","1");
					
				}
				
				callback(result);
				
			});
			
		}

	};
});