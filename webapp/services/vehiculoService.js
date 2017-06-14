sap.ui.define([
    "sap/ui/model/json/JSONModel",
    "sap/ui/Device",
    "pe/seidor/sap/comagenda_vehiculo/model/models"
], function (JSONModel, Device, models) {
    "use strict";

    return {

        stringModel: "/Vehiculo",
        genNameService: function (cad) {
            return "vehiculoService." + cad;
        },
        getListAll: function (callback) {
            return models.modelHXRead("/VistaVehiculosAll", this.genNameService("getListAll"), callback);
        },
        getListByCliente: function (id, callback) {
            return models.modelHXRead("/VistaVehiculosAll?$filter= CLIENTE_ID eq " + id, this.genNameService("getListAll"), callback);
        }

    };
});