sap.ui.define([
    "sap/ui/model/json/JSONModel",
    "sap/ui/Device"
], function (JSONModel, Device) {
    "use strict";

    return {

        createDeviceModel: function () {
            var oModel = new JSONModel(Device);
            oModel.setDefaultBindingMode("OneWay");
            return oModel;
        },
        modelXS: function () {
           var oModel = new sap.ui.model.odata.ODataModel( //new sap.ui.model.odata.v2.ODataModel(
                // serviceUrl: "/demo_services/storedata/services.xsodata/"
                "https://dbdemop1942301772trial.hanatrial.ondemand.com/demo_services/storedata/services.xsodata/"
            );

            oModel.setHeaders({
                "Authorization": "Basic U1lTVEVNOlNlaWRvciQyMDE3I1BlcnU="
            });
            
           /* return new sap.ui.model.odata.v2.ODataModel({
				serviceUrl: "/demo_services/storedata/services.xsodata/"
			}); */
            
            return oModel;
        },
        modelHXRead: function (url, servicio, callback, metodo) {

            if (!metodo) {
                metodo = "GET";
            }

            console.warn("<--------	" + servicio.toUpperCase() + " || READ	OPERACION --------->");
            console.info("URL");
            console.info(url);
            console.info("METODO");
            console.info(metodo);
            console.log("\n");

            this.modelXS().read(url, {
                method: metodo,
                success: function (data) {

                    var respuestaService = {
                        c: "s",
                        m: "",
                        data: data.results ? data.results: data
                    };

                    console.warn("SUCCES *********");
                    console.log("\n");
                    console.info("REPONSE");
                    console.log(data);

                    console.info("RESPUESTA");
                    console.log(respuestaService);
                    console.log("\n");
                    console.log("\n");

                    return callback(respuestaService);

                },
                error: function (err) {

                    var respuestaService = {
                        c: "ex",
                        m: "Execpcion del sistema",
                        data: err
                    };

                    console.error("ERROR *********");
                    console.log("\n");
                    console.info("REPONSE");
                    console.log(err);
                    console.info("RESPUESTA");
                    console.log(respuestaService);
                    console.log("\n");
                    console.log("\n");

                    return callback(respuestaService);
                }
            });

        },
        modelHXInsert: function (url, DataInsert, servicio, callback) {

            if (!url) {
                return callback({
                    c: "ex",
                    m: "Execpcion del sistema / no existe url para el servicio oData",
                    data: null
                });
            }

            if (!DataInsert) {
                return callback({
                    c: "ex",
                    m: "Execpcion del sistema / no existe DataInsert para el servicio oData",
                    data: null
                });
            }

            console.warn("<--------	" + servicio.toUpperCase() + " || INSERT OPERACION --------->");
            console.info("URL");
            console.info(url);
            console.info("DATA_INSERT");
            console.info(DataInsert);

            this.modelXS().create(url, DataInsert, {
                success: function (data) {
                    var respuestaService = {
                        c: "s",
                        m: "",
                        data: data.results
                    };

                    console.warn("SUCCES *********");
                    console.log("\n");
                    console.info("REPONSE");
                    console.log(data);

                    console.info("RESPUESTA");
                    console.log(respuestaService);
                    console.log("\n");
                    console.log("\n");

                    return callback(respuestaService);
                },
                error: function (err) {

                    var respuestaService = {
                        c: "ex",
                        m: "Execpcion del sistema",
                        data: err
                    };

                    console.error("ERROR *********");
                    console.log("\n");
                    console.info("REPONSE");
                    console.log(err);
                    console.info("RESPUESTA");
                    console.log(respuestaService);
                    console.log("\n");
                    console.log("\n");

                    return callback(respuestaService);

                }
            });

        },
        modelHXUpdate: function (url, DataInsert, servicio, callback) {

            if (!url) {
                return callback({
                    c: "ex",
                    m: "Execpcion del sistema / no existe url para el servicio oData",
                    data: null
                });
            }

            if (!DataInsert) {
                return callback({
                    c: "ex",
                    m: "Execpcion del sistema / no existe DataInsert para el servicio oData",
                    data: null
                });
            }

            console.warn("<--------	" + servicio.toUpperCase() + " || UPDATE OPERACION --------->");
            console.info("URL");
            console.info(url);
            console.info("DATA_UPDATE");
            console.info(DataInsert);

            this.modelXS().update(url, DataInsert, {
                success: function (data) {
                    var respuestaService = {
                        c: "s",
                        m: "",
                        data: data.results
                    };

                    console.warn("SUCCES *********");
                    console.log("\n");
                    console.info("REPONSE");
                    console.log(data);

                    console.info("RESPUESTA");
                    console.log(respuestaService);
                    console.log("\n");
                    console.log("\n");

                    return callback(respuestaService);
                },
                error: function (err) {

                    var respuestaService = {
                        c: "ex",
                        m: "Execpcion del sistema",
                        data: err
                    };

                    console.error("ERROR *********");
                    console.log("\n");
                    console.info("REPONSE");
                    console.log(err);
                    console.info("RESPUESTA");
                    console.log(respuestaService);
                    console.log("\n");
                    console.log("\n");

                    return callback(respuestaService);

                }
            });

        },
        modelHXBatchEntry: function (url, DataInsert, servicio, callback) {

            var oModel = this.modelXS();
            var batchChanges = [];

            if (!url) {
                return callback({
                    c: "ex",
                    m: "Execpcion del sistema / no existe url para el servicio oData",
                    data: null
                });
            }

            if (!DataInsert) {
                return callback({
                    c: "ex",
                    m: "Execpcion del sistema / no existe DataInsert para el servicio oData",
                    data: null
                });
            }

            console.warn("<--------	" + servicio.toUpperCase() + " || INSERT BATCH OPERACION --------->");
            console.info("URL");
            console.info(url);
            console.info("DATA_INSERT");
            console.info(DataInsert);

            for (var i = 0; i < DataInsert.length; i++) {
                batchChanges.push(oModel.createBatchOperation(url, "POST", DataInsert[i], null));
            }


            oModel.addBatchChangeOperations(batchChanges);
            oModel.setUseBatch(true);
            oModel.submitBatch(function (data) {
                var respuestaService = {
                    c: "s",
                    m: "",
                    data: data.results
                };

                console.warn("SUCCES *********");
                console.log("\n");
                console.info("REPONSE");
                console.log(data);

                console.info("RESPUESTA");
                console.log(respuestaService);
                console.log("\n");
                console.log("\n");

                return callback(respuestaService);
            }, function (err) {

                var respuestaService = {
                    c: "ex",
                    m: "Execpcion del sistema",
                    data: err
                };

                console.error("ERROR *********");
                console.log("\n");
                console.info("REPONSE");
                console.log(err);
                console.info("RESPUESTA");
                console.log(respuestaService);
                console.log("\n");
                console.log("\n");

                return callback(respuestaService);

            }, true, true);
        }

    };
});