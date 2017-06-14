sap.ui.define([
	"sap/ui/model/json/JSONModel",
	"sap/ui/Device",
	"pe/seidor/sap/comagenda_vehiculo/model/models"
], function(JSONModel, Device, models) {
	"use strict";

	return {
		
		stringModel : "/TipoVehiculo",
		genNameService : function(cad){
			return "tipoVehiculoService." + cad;
		},
		getListAll: function(callback) {
			
			return models.modelHXRead(this.stringModel+"?$select=TIPO_VEHICULO_ID,TIPO_VEHICULO_DESC,TIPO_VEHICULO_ESTADO,TIPO_VEHICULO_IMAGE_URL",this.genNameService("getListAll"),callback);
			
		},
                getVehiculoById: function(id,callback){
                        return models.modelHXRead(this.stringModel+"("+id+")",this.genNameService("getVehiculoById"),callback);
                }

	};
});