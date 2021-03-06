sap.ui.define([
	"sap/ui/model/json/JSONModel",
	"sap/ui/Device",
	"pe/seidor/sap/comagenda_vehiculo/model/models"
], function(JSONModel, Device, models) {
	"use strict";

	return {
		
		stringModel : "/Cliente",
		genNameService : function(cad){
			return "clienteServices." + cad;
		},
		getListAll: function(callback) {
			
			return models.modelHXRead("/VistaClientesAll",this.genNameService("getListAll"),callback);
			
		}

	};
});