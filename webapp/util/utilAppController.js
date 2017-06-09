sap.ui.define([
	"sap/ui/model/json/JSONModel",
	"sap/ui/Device",
	"pe/seidor/sap/comagenda_vehiculo/model/models"
], function(JSONModel, Device, models) {
	"use strict";

	return {
		
		genNameService : function(view){
			return "tipoMantencionServices." + cad;
		},
		getListAll: function(callback) {
			
			return models.modelHXRead(this.stringModel,this.genNameService("getListAll"),callback);
			
		}

	};
});