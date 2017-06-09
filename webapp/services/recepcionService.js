sap.ui.define([
	"sap/ui/model/json/JSONModel",
	"sap/ui/Device",
	"pe/seidor/sap/comagenda_vehiculo/model/models",
	"pe/seidor/sap/comagenda_vehiculo/util/utilFunctions"
], function(JSONModel, Device, models,utilFunctions) {
	"use strict";

	return {
		stringModel : "/Recepcion",
		genNameService : function(cad){
			return "recepcionService." + cad;
		},
		getListAll: function(callback) {
			
			return models.modelHXRead("/VistaAgenda",this.genNameService("getListAll"),callback);
			
		},
                registrar: function(parametros,callback){
                       //return  models.modelHXBatchEntry(this.stringModel,[parametros],this.genNameService("getListAll"), callback);
                      return models.modelHXInsert(this.stringModel, parametros, this.genNameService("registrar"), callback);
                },
                registraInspecciones: function(parametros,callback){
                    
                    return  models.modelHXBatchEntry("/RecepcionPInspeccionOcurrencia",parametros,this.genNameService("registraInspecciones"), callback);
                    
                }

	};
});