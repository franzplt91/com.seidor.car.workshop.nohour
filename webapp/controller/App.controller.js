sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "pe/seidor/sap/comagenda_vehiculo/services/ubigeoService",
    "pe/seidor/sap/comagenda_vehiculo/services/agendaService",
    "pe/seidor/sap/comagenda_vehiculo/services/giroComercialService",
    "pe/seidor/sap/comagenda_vehiculo/services/clienteService",
    "pe/seidor/sap/comagenda_vehiculo/services/tipoDocumentoService",
    "pe/seidor/sap/comagenda_vehiculo/services/vehiculoService",
    "pe/seidor/sap/comagenda_vehiculo/services/tipoMantencionService",
    "pe/seidor/sap/comagenda_vehiculo/services/condicionPagoService",
    "sap/ui/model/json/JSONModel",
    "pe/seidor/sap/comagenda_vehiculo/util/utilCanvasAutoFrontal",
    "pe/seidor/sap/comagenda_vehiculo/util/utilCanvasAutoPosterior",
    "pe/seidor/sap/comagenda_vehiculo/services/testService",
    "sap/m/MessageBox",
    "pe/seidor/sap/comagenda_vehiculo/services/pInspeccionServices",
    "pe/seidor/sap/comagenda_vehiculo/services/ocurrenciaServices",
    "pe/seidor/sap/comagenda_vehiculo/services/recepcionService",
    "pe/seidor/sap/comagenda_vehiculo/util/utilFunctions",
    "pe/seidor/sap/comagenda_vehiculo/services/seguroService",
    "pe/seidor/sap/comagenda_vehiculo/services/tipoVehiculoService"
], function (Controller, ubigeoService, agendaService, giroComercialService,
        clienteService, tipoDocumentoService, vehiculoService, tipoMantencionService,
        condicionPagoService, JSONModel, utilCanvasAutoFrontal, utilCanvasAutoPosterior,
        testService, MessageBox, pInspeccionServices, ocurrenciaServices,
        recepcionService, utilFunctions, seguroService, tipoVehiculoService) {
    "use strict";

    return Controller.extend("pe.seidor.sap.comagenda_vehiculo.controller.App", {

        onInit: function () {

            this.Inicializar();
        },
        IconoSeleccionado: "",
        CanvasInicializado: true,
        IdRecepcion: 0,
        Inicializar: function () {
            sap.ui.core.BusyIndicator.show(0);
            var self = this;
            this.getView().setModel(new JSONModel({}));
            this.getView().byId("cbo_tipo_mantencion").setEnabled(false);
            this.getView().byId("ele_cbo_com_seguro").setVisible(false);
            this.getView().byId("ele_txt_com_seguro").setVisible(false);
            var listaInspeccion = [];

            self.getView().getModel().setProperty("/Cliente", {});
            self.getView().getModel().setProperty("/ActivaIconos", false);
            self.getView().getModel().setProperty("/ActivaCamposCliente", false);
            self.getView().getModel().setProperty("/ActivaCamposVehiculo", false);
            self.getView().getModel().setProperty("/listaInspeccion", listaInspeccion);


            self.getView().getModel().setProperty("/Inspeccion", {
                ItemNumero: 0,
                Inspeccion: {},
                Ocurrencias: [],
                OcurrenciasText: [],
                Comentario: "",
                Coordenadas: {}
            });
            self.getView().getModel().refresh();
            this.getView().byId('htmlContentVistaCamara').setContent("<div id='contentVideos'></div>");
            this.getView().byId('htmlContentVistaFrontalPreview').setContent("<div id='preview_inspeccion'></div>");
            this.onCargarTipoDocumento();
            this.getView().byId(this.createId("check_group_mantencion")).setSelectedIndex(2);
        },
        onCargarTipoDocumento: function () {
            var self = this;
            tipoDocumentoService.getListAll(function (rptaTD) {

                if (rptaTD.c === "s") {

                    var objSelect = {};
                    objSelect.TIPO_DOC_ID = 0;
                    objSelect.TIPO_DOC_DESC = "Seleccione";
                    var list = [];

                    list.push(objSelect);

                    for (var i = 0; i < rptaTD.data.length; i++) {
                        list.push(rptaTD.data[i]);
                    }

                    self.getView().getModel().setProperty("/TipoDocListaModel", list);
                    self.getView().getModel().refresh();

                }

                self.onCargarPuntosInspeccion();

            });
        },
        onCargarPuntosInspeccion: function () {
            var self = this;
            pInspeccionServices.getListAll(function (pIns) {

                if (pIns.c === "s") {
                    self.getView().getModel().setProperty("/PInspeccionModel", pIns.data);
                    self.getView().getModel().refresh();

                }

                self.onCargarOcurrencias();

            });
        },
        onCargarOcurrencias: function () {
            var self = this;
            ocurrenciaServices.getListAll(function (ocu) {

                if (ocu.c === "s") {

                    for (var i = 0; i < ocu.data.length; i++) {
                        ocu.data.COMENTARIO = "";
                    }
                    self.getView().getModel().setProperty("/OcurrenciaListaModel", ocu.data);
                    self.getView().getModel().refresh();

                }

                self.onCargarGirosComerciales();

            });
        },
        onCargarGirosComerciales: function () {
            var self = this;
            giroComercialService.getListAll(function (rptaGC) {

                if (rptaGC.c === "s") {

                    var objSelect = {};
                    objSelect.GIRO_COM_ID = 0;
                    objSelect.GIRO_COM_DESC = "Seleccione";
                    var list = [];

                    list.push(objSelect);

                    for (var i = 0; i < rptaGC.data.length; i++) {
                        list.push(rptaGC.data[i]);
                    }

                    self.getView().getModel().setProperty("/GiroComercialListaModel", list);
                    self.getView().getModel().refresh();

                }

                self.onCargarUbigeos();

            });
        },
        onCargarUbigeos: function () {
            var self = this;
            ubigeoService.getListAll(function (rptaubi) {

                if (rptaubi.c === "s") {

                    var objSelect = {};
                    objSelect.UBIGEO_ID = "000000";
                    objSelect.UBIGEO_DEPARTAMENTO = " Seleccione";
                    objSelect.UBIGEO_PROVINCIA = " Seleccione";
                    objSelect.UBIGEO_DISTRITO = " Seleccione";
                    var list = [];

                    list.push(objSelect);

                    for (var i = 0; i < rptaubi.data.length; i++) {
                        list.push(rptaubi.data[i]);
                    }


                    for (var i = 0; i < rptaubi.data.length; i++) {
                        rptaubi.data[i].UBI_PROVINCIA = rptaubi.data[i].UBIGEO_ID.substring(0, 4);
                        rptaubi.data[i].UBI_DEPARTAMENTO = rptaubi.data[i].UBIGEO_ID.substring(0, 2);
                    }

                    var listaDepartamentos = self.onGeneraDepartamentos(rptaubi);
                    var listaProvincias = self.onGeneraProvincia(rptaubi);

                    console.log(listaDepartamentos);
                    console.log(listaProvincias);
                    console.log(rptaubi);

                    self.getView().getModel().setProperty("/UbigeoDepListaModel", listaDepartamentos);
                    self.getView().getModel().setProperty("/UbigeoProvListaModel", listaProvincias);
                    self.getView().getModel().setProperty("/UbigeoProvListaTotalModel", listaProvincias);
                    self.getView().getModel().setProperty("/UbigeoDistListaTotalModel", list);
                    self.getView().getModel().setProperty("/UbigeoDistListaModel", list);
                    self.getView().getModel().refresh();
                    self.getView().byId("cbo_ubigeo").setSelectedKey("000000");
                    self.getView().byId("cbo_provincia").setSelectedKey("0000");
                    self.getView().byId("cbo_departamento").setSelectedKey("00");

                }

                self.onCargarTipoMantencion();

            });
        },
        onGeneraDepartamentos: function (data) {
            var objSelect = {};
            objSelect.UBIGEO_ID = "00";
            objSelect.UBI_DEPARTAMENTO = "00";
            objSelect.UBIGEO_DEPARTAMENTO = " Seleccione";
            objSelect.UBIGEO_PROVINCIA = " Seleccione";
            objSelect.UBIGEO_DISTRITO = " Seleccione";
            var listDeparamentos = [];

            listDeparamentos.push(objSelect);

            for (var i = 0; i < data.data.length; i++) {
                var obj = data.data[i];
                if (i === 0) {

                    listDeparamentos.push(obj);

                } else {
                    var no_existe = true;

                    for (var j = 0; j < listDeparamentos.length; j++) {
                        var objCurrent = listDeparamentos[j];
                        if (objCurrent.UBI_DEPARTAMENTO === obj.UBI_DEPARTAMENTO) {
                            no_existe = false;
                            j = listDeparamentos.length + 1;
                        }
                    }

                    if (no_existe) {
                        listDeparamentos.push(obj);
                    }
                }
            }

            return listDeparamentos;
        },
        onGeneraProvincia: function (data) {
            var objSelect = {};
            objSelect.UBIGEO_ID = "0000";
            objSelect.UBI_PROVINCIA = "0000";
            objSelect.UBIGEO_DEPARTAMENTO = " Seleccione";
            objSelect.UBIGEO_PROVINCIA = " Seleccione";
            objSelect.UBIGEO_DISTRITO = " Seleccione";
            var listProvincia = [];

            listProvincia.push(objSelect);

            for (var i = 0; i < data.data.length; i++) {
                var obj = data.data[i];
                if (i === 0) {

                    listProvincia.push(obj);

                } else {
                    var no_existe = true;

                    for (var j = 0; j < listProvincia.length; j++) {
                        var objCurrent = listProvincia[j];
                        if (objCurrent.UBI_PROVINCIA === obj.UBI_PROVINCIA) {
                            no_existe = false;
                            j = listProvincia.length + 1;
                        }
                    }

                    if (no_existe) {
                        listProvincia.push(obj);
                    }
                }
            }

            return listProvincia;
        },
        onCargarTipoMantencion: function () {
            var self = this;
            tipoMantencionService.getListAll(function (dataResultado) {

                if (dataResultado.c === "s") {

                    var objSelect = {
                        TIPO_MANTENCION_ID: 0,
                        TIPO_MANTENCION_DESC: "Seleccione"
                    };

                    var list = [];

                    list.push(objSelect);

                    for (var i = 0; i < dataResultado.data.length; i++) {
                        list.push(dataResultado.data[i]);
                    }

                    self.getView().getModel().setProperty("/tipoMantencionListaModel", list);
                    self.getView().getModel().refresh();

                }

                self.onCargarCondicionPago();

            });
        },
        onCargarCondicionPago: function () {
            var self = this;
            condicionPagoService.getListAll(function (dataResultado2) {

                if (dataResultado2.c === "s") {

                    var objSelect = {
                        COND_PAGO_ID: 0,
                        COND_PAGO_DESC: "Seleccione"
                    };

                    var list = [];

                    list.push(objSelect);

                    for (var i = 0; i < dataResultado2.data.length; i++) {
                        list.push(dataResultado2.data[i]);
                    }

                    self.getView().getModel().setProperty("/condicionPagoListaModel", list);
                    self.getView().getModel().refresh();

                }

                self.onCargarSeguro();

            });
        },
        onCargarSeguro: function () {
            var self = this;
            seguroService.getListAll(function (dataResultado2) {

                if (dataResultado2.c === "s") {

                    var objSelect = {
                        SEGURO_ID: 0,
                        SEEGURO_DESC: "Seleccione"
                    };

                    var list = [];

                    list.push(objSelect);

                    for (var i = 0; i < dataResultado2.data.length; i++) {
                        list.push(dataResultado2.data[i]);
                    }

                    self.getView().getModel().setProperty("/seguroListaModel", list);
                    self.getView().getModel().refresh();

                }

                self.onCargarTipoVehiculo();

            });
        },
        onCargarTipoVehiculo: function () {
            var self = this;
            tipoVehiculoService.getListAll(function (dataResultado2) {

                if (dataResultado2.c === "s") {

                    var objSelect = {
                        TIPO_VEHICULO_ID: 0,
                        TIPO_VEHICULO_DESC: "Seleccione"
                    };

                    var list = [];

                    list.push(objSelect);

                    for (var i = 0; i < dataResultado2.data.length; i++) {
                        list.push(dataResultado2.data[i]);
                    }

                    self.getView().getModel().setProperty("/tipoVehiculosListaModel", list);
                    self.getView().getModel().refresh();

                }

                self.onCargarClientes();

            });
        },
        onCargarClientes: function () {
            var self = this;
            clienteService.getListAll(function (dataResultado3) {
                var listaTotal = dataResultado3.data;

                self.getView().getModel().setProperty("/clientesListaTotalModel", listaTotal);
                //self.getView().getModel().setProperty("/clientesListaModel", listaDisplay);

                self.getView().getModel().refresh();
                sap.ui.core.BusyIndicator.hide();

            });
        },
        onNuevoCliente: function (oEvent) {

            this.getView().getModel().setProperty("/ActivaIconos", true);
            this.getView().getModel().setProperty("/ActivaCamposCliente", true);
            this.getView().getModel().setProperty("/ActivaCamposVehiculo", true);

            this.onLimpiarCliente();
            this.onLimpiarVehiculo();
            this.onLimpiarOrdenServicio();
            this.onLimpiarPuntoInspeccion();
            this.onLimpiarFotografia();
            this.getView().byId("tab_menu").setSelectedKey("tab_cliente");
            //this.getView().byId("cbo_nro_doc").setFocus(true);
            this.getView().getModel().refresh();

        }, onLimpiarCliente: function () {
            /*** LIMPIA CAMPOS DE CLIENTE ***/
            var objSelectPro = {};
            objSelectPro.UBIGEO_ID = "000000";
            objSelectPro.UBI_PROVINCIA = "0000";
            objSelectPro.UBIGEO_DEPARTAMENTO = " Seleccione";
            objSelectPro.UBIGEO_PROVINCIA = " Seleccione";
            objSelectPro.UBIGEO_DISTRITO = " Seleccione";

            var objSelectDistrito = {};
            objSelectDistrito.UBIGEO_ID = "000000";
            objSelectDistrito.UBI_PROVINCIA = "0000";
            objSelectDistrito.UBIGEO_DEPARTAMENTO = " Seleccione";
            objSelectDistrito.UBIGEO_PROVINCIA = " Seleccione";
            objSelectDistrito.UBIGEO_DISTRITO = " Seleccione";

            this.getView().getModel().setProperty("/Cliente", {});
            this.getView().getModel().setProperty("/UbigeoProvListaModel", [objSelectPro]);
            this.getView().getModel().setProperty("/UbigeoDistListaModel", [objSelectDistrito]);

            this.getView().byId("cbo_tipo_doc").setSelectedKey("0");
            this.getView().byId("cbo_nro_doc").setValue("");
            this.getView().byId("check_empresa").setSelected(false);
            this.getView().byId("cbo_giro_comercial").setVisible(false);
            this.getView().byId("cbo_giro_comercial").setSelectedKey("0");
            this.getView().byId("txt_nombre").setValue("");
            this.getView().byId("txt_apellido_paterno").setValue("");
            this.getView().byId("txt_apellido_materno").setValue("");
            this.getView().byId("txt_direccion").setValue("");
            this.getView().byId("txt_telefono").setValue("");
            this.getView().byId("txt_celular").setValue("");
            this.getView().byId("txt_correo").setValue("");
            this.getView().byId("cbo_ubigeo").setSelectedKey("000000");
            this.getView().byId("cbo_provincia").setSelectedKey("0000");
            this.getView().byId("cbo_departamento").setSelectedKey("00");
            this.getView().getModel().refresh();
        }, onLimpiarVehiculo: function () {
            /*** LIMPIA CAMPOS DE CLIENTE ***/
            this.getView().byId("cbo_tipo_vehiculo").setSelectedKey("0");
            this.getView().byId("txt_placa").setValue("");
            this.getView().byId("txt_vin").setValue("");
            this.getView().byId("txt_marca").setValue("");
            this.getView().byId("txt_modelo").setValue("");
            this.getView().byId("txt_color").setValue("");
            this.getView().byId("txt_anio").setValue("");
        }, onLimpiarOrdenServicio: function () {
            /*** LIMPIA CAMPOS DE CLIENTE ***/
            this.getView().byId("check_servicio").setSelected(false);
            this.onCheckServicio();
            this.getView().byId("cbo_tipo_mantencion").setSelectedKey("0");
            this.getView().byId("check_inspeccion").setSelected(false);
            this.getView().byId("check_presupuesto").setSelected(false);
            this.getView().byId("check_general").setSelected(false);
            this.getView().byId("txt_observaciones").setValue("");

            this.getView().byId("check_plumillas").setSelected(false);
            this.getView().byId("check_radio").setSelected(false);
            this.getView().byId("check_piso_goma").setSelected(false);

            this.getView().byId("check_gata").setSelected(false);
            this.getView().byId("check_accesorios").setSelected(false);
            this.getView().byId("check_heramientas").setSelected(false);

            this.getView().byId("check_panel_radio").setSelected(false);
            this.getView().byId("check_encendedor").setSelected(false);
            this.getView().byId("check_seguridad").setSelected(false);

            this.getView().byId("check_tapa_ruedas").setSelected(false);
            this.getView().byId("check_tag").setSelected(false);
            this.getView().byId("check_ruedas_repuesto").setSelected(false);

            this.getView().byId("txt_kilometraje").setValue("");
            this.getView().byId("sld_nivel_combustible").setValue(0);

        },
        onLimpiarPuntoInspeccion: function () {


            this.getView().byId('htmlContentVistaFrontalPreview').setContent("<div id='preview_inspeccion'></div>");
            this.getView().getModel().setProperty("/listaInspeccion", []);
            this.getView().getModel().refresh();
            utilCanvasAutoFrontal.selectedTipoVehiculo = "0";
            utilCanvasAutoFrontal.clearRegion();

        },
        onLimpiarFotografia: function () {
            var videos = $(".videos_inspeccion");

            for (var i = 0; i < videos.length; i++) {
                var video = videos[i];
                video.remove();
            }
            var grid = this.getView().byId("gridFotos");
            grid.removeAllContent();
        },
        onCheckedEmpresa: function () {

            this.getView().byId("cbo_giro_comercial").setVisible(this.getView().byId("check_empresa").getSelected());
        },
        onSelectDepartemento: function () {
            var departamento = this.getView().byId("cbo_departamento").getSelectedKey();
            var lista_provincias = this.getView().getModel().getProperty("/UbigeoProvListaTotalModel");

            var lista_display = lista_provincias.filter(function (item) {
                return item.UBI_DEPARTAMENTO === departamento;
            });

            var objSelect = {};
            objSelect.UBIGEO_ID = "0000";
            objSelect.UBI_PROVINCIA = "0000";
            objSelect.UBIGEO_DEPARTAMENTO = " Seleccione";
            objSelect.UBIGEO_PROVINCIA = " Seleccione";
            objSelect.UBIGEO_DISTRITO = " Seleccione";

            lista_display.push(objSelect);

            this.getView().getModel().setProperty("/UbigeoProvListaModel", lista_display);
            this.getView().getModel().refresh();
            this.getView().byId("cbo_provincia").setSelectedKey("0000");
        },
        onSelectProvincia: function () {
            var provincia = this.getView().byId("cbo_provincia").getSelectedKey();
            var lista_distritos = this.getView().getModel().getProperty("/UbigeoDistListaTotalModel");

            var lista_display = lista_distritos.filter(function (item) {
                return item.UBI_PROVINCIA === provincia;
            });

            var objSelect = {};
            objSelect.UBIGEO_ID = "000000";
            objSelect.UBI_PROVINCIA = "0000";
            objSelect.UBIGEO_DEPARTAMENTO = " Seleccione";
            objSelect.UBIGEO_PROVINCIA = " Seleccione";
            objSelect.UBIGEO_DISTRITO = " Seleccione";

            lista_display.push(objSelect);

            this.getView().getModel().setProperty("/UbigeoDistListaModel", lista_display);
            this.getView().getModel().refresh();
            this.getView().byId("cbo_ubigeo").setSelectedKey("000000");
        },
        onSelectTipoVehiculo: function () {
            if (this.getView().byId("cbo_tipo_vehiculo").getSelectedKey() === "0"
                    || this.getView().byId("cbo_tipo_vehiculo").getSelectedKey() === utilCanvasAutoFrontal.selectedTipoVehiculo) {
                this.CanvasInicializado = false;
                return;
            }

            this.CanvasInicializado = true;
        },
        onSelectChanged: function (oEvent) {

            var self = this;
            this.IconoSeleccionado = oEvent.getParameter("key");

            if (this.IconoSeleccionado === "1") {

                if (this.CanvasInicializado) {
                    var id = this.getView().byId("cbo_tipo_vehiculo").getSelectedKey();

                    if (id === "0") {
                        this.errorMensaje("Seleccione un tipo de vehiculo");
                        return;
                    }

                    self.getView().byId("dlg_inspeccion").open();
                    //utilCanvasAutoFrontal.clearRegion();
                    sap.ui.core.BusyIndicator.show(0);
                    utilCanvasAutoFrontal.render(id,
                            function (resultHTML) {
                                if (resultHTML) {
                                    self.getView().getModel().setProperty("/listaInspeccion", utilCanvasAutoFrontal.selectedCoord);
                                    self.getView().byId('htmlContentVistaFrontal').setContent("");
                                    self.getView().byId('htmlContentVistaFrontal').setContent(resultHTML.innerHTML);
                                    self.getView().getModel().refresh();
                                }
                                self.CanvasInicializado = false;
                                sap.ui.core.BusyIndicator.hide();
                            },
                            function (area) {

                                var ins = self.getInspeccionFromCode(parseInt(area.title));
                                self.getView().getModel().setProperty("/Inspeccion", ins);
                                self.getView().getModel().refresh();
                                self.getView().byId("dlg_autoparte").open();
                                self.getView().byId("txt_comentario_inspeccion").setValue("");
                                self.getView().byId("list_ocurrencias").removeSelections(true);
                            });
                }
            }
            if (this.IconoSeleccionado === "orden_servicio_icon")
            {
                setTimeout(function () {
                    jQuery('.sapMSliderTickmarks').html('');
                    var hh = '<li class="sapMSliderTickLabel" style="left: 0%;"><div class="sapMSliderLabel">0</div></li>';
                    hh += '<li class="sapMSliderTickLabel" style="left: 25%;"><div class="sapMSliderLabel">1/4</div></li>';
                    hh += '<li class="sapMSliderTickLabel" style="left: 50%;"><div class="sapMSliderLabel">1/2</div></li>';
                    hh += '<li class="sapMSliderTickLabel" style="left: 75%;"><div class="sapMSliderLabel">3/4</div></li>';
                    hh += '<li class="sapMSliderTickLabel" style="left: 100%;"><div class="sapMSliderLabel">1</div></li>';
                    jQuery('.sapMSliderTickmarks').html(hh);
                }, 10);
            }
        },
        onClose: function () {
            this.getView().byId("dlg_autoparte").close();
        },
        mostarVistaFrontal: function () {

            this.getView().byId("boxVistaFrontal").setVisible(true);
            this.getView().byId("boxvistaPosterior").setVisible(false);
        },
        mostarVistaPosterior: function () {

            this.getView().byId("boxVistaFrontal").setVisible(false);
            this.getView().byId("boxvistaPosterior").setVisible(true);
        },
        renderPuntoInspeccion: function (idTipoVehiculo) {

            tipoVehiculoService.getVehiculoById(idTipoVehiculo, function (result) {
                if (result.c === "s") {

                    console.log(result);

                }
            });
        },
        onAgregarInspeccion: function () {
            var self = this;

            var lista = self.getView().getModel().getProperty("/listaInspeccion");
            var inspeccion = self.getView().getModel().getProperty("/Inspeccion");
            var Ocurrencias = self.getView().byId("list_ocurrencias")._aSelectedPaths;
            var event = window.PointEvent;
            var x = event.offsetX; // x == the location of the click in the document - the location (relative to the left) of the canvas in the document
            var y = event.offsetY;
            var comen = self.getView().byId("txt_comentario_inspeccion").getValue();

            if (Ocurrencias.length < 1) {
                this.errorMensaje("Seleccione un daño");
                return;
            }

            var ocu = {
                ItemNumero: lista.length + 1,
                Inspeccion: {
                    PINSPECCION_ID: inspeccion.PINSPECCION_ID,
                    PINSPECCION_DESC: inspeccion.PINSPECCION_DESC
                },
                Ocurrencias: [],
                OcurrenciasText: [],
                Comentario: comen,
                Coordenadas: {
                    X: x,
                    Y: y
                }
            };

            for (var i = 0; i < Ocurrencias.length; i++) {
                var ocuAux = self.getView().getModel().getProperty(Ocurrencias[i]);
                ocu.Ocurrencias.push(ocuAux);
                ocu.OcurrenciasText.push(ocuAux.OCURRENCIA_DESC);
            }

            lista.push(ocu);

            self.getView().getModel().setProperty("/Inspeccion", {
                ItemNumero: 0,
                Inspeccion: {},
                Ocurrencias: [],
                OcurrenciasText: [],
                Comentario: "",
                Coordenadas: {}
            });

            utilCanvasAutoFrontal.selectedCoord = lista;
            self.getView().getModel().setProperty("/listaInspeccion", lista);
            self.getView().getModel().refresh();
            self.getView().byId("dlg_autoparte").close();
            //utilCanvasAutoFrontal.printInspeccion();
            console.log(inspeccion);
            console.log(lista);

        },
        onAceptaInspeccionCanvas: function () {
            sap.ui.core.BusyIndicator.show();
            var self = this;
            utilCanvasAutoFrontal.draw();
            self.getView().byId("dlg_inspeccion").close();
            self.getView().byId("list_ocurrencias").removeSelections(true);
            utilCanvasAutoFrontal.printInspeccion();
        },
        onCloseInspeccion: function () {
            var self = this;
            self.getView().byId(this.createId("dlg_autoparte")).close();
            self.getView().getModel().setProperty("/Inspeccion", {
                ItemNumero: 0,
                Inspeccion: {},
                Ocurrencias: [],
                OcurrenciasText: [],
                Comentario: "",
                Coordenadas: {}
            });
            utilCanvasAutoFrontal.draw();
            self.getView().byId("list_ocurrencias").removeSelections(true);
        },
        onSelectCliente: function (evt) {
            sap.ui.core.BusyIndicator.show();
            var obj = evt.getSource().getSelectedItem().getBindingContext().getObject();
            obj.UBIGEO_ID_PROV = obj.UBIGEO_ID.substring(0, 4);
            obj.UBIGEO_ID_DEP = obj.UBIGEO_ID.substring(0, 2);
            console.log(obj);

            this.getView().getModel().setProperty("/Cliente", obj);
            this.getView().getModel().setProperty("/ActivaIconos", true);
            this.getView().getModel().refresh();
            sap.ui.core.BusyIndicator.hide();

        },
        onSave: function () {

            MessageBox.success(
                    "Recepción registrada con exito", {
                        styleClass: "sapUiSizeCompact"
                    }
            );

            var self = this;
            self.getView().getModel().setProperty("/Agenda", {});
            /* self.getView().getModel().setProperty("/Inspeccion", {
             ItemNumero: 0,
             AutoParte: "",
             Inspeccion: ""
             }); 
             
             utilCanvasAutoFrontal.clearRegion();
             utilCanvasAutoPosterior.clearRegion();
             */
        },
        onCancelRecepcion: function () {
            MessageBox.error(
                    "Recepción cancelada", {
                        styleClass: "sapUiSizeCompact"
                    }
            );

            var self = this;
            self.getView().getModel().setProperty("/Agenda", {});
            self.getView().getModel().setProperty("/Inspeccion", {
                ItemNumero: 0,
                AutoParte: "",
                Inspeccion: ""
            });

            utilCanvasAutoFrontal.clearRegion();
            //utilCanvasAutoPosterior.clearRegion();
        },
        castStringToDate: function (valor) {
            var dateParts = valor.split(" ");
            var fecha = dateParts[0].split("/");
            var hora = dateParts[1].split(":");
            return new Date(fecha[2], fecha[1] - 1, fecha[0], hora[0], hora[1], hora[2]);
        },
        getInspeccionFromCode: function (codigo) {

            var pinspe = this.getView().getModel().getProperty("/PInspeccionModel");

            for (var i = 0; i < pinspe.length; i++) {

                if (codigo === pinspe[i].PINSPECCION_ID) {
                    return pinspe[i];
                }

            }

        },
        onOpenInspeccion: function () {
            utilCanvasAutoFrontal.draw();
            this.getView().byId("dlg_inspeccion").open();
        },
        onCancelPointInspeccion: function (event) {
            sap.ui.core.BusyIndicator.show();
            console.log(event.getSource().getBindingContext().getObject());
            console.log(event.getSource());
            console.log(event);
            var data = this.getView().getModel().getProperty("/listaInspeccion");
            var dataNew = [];
            var Contador = 1;
            for (var i = 0; i < data.length; i++) {
                var objCurrent = data[i];

                if (objCurrent.ItemNumero !== event.getSource().getBindingContext().getObject().ItemNumero) {
                    objCurrent.ItemNumero = Contador;
                    dataNew.push(objCurrent);
                    Contador++;
                }
            }
            utilCanvasAutoFrontal.selectedCoord = dataNew;
            this.getView().getModel().setProperty("/listaInspeccion", dataNew);
            this.getView().getModel().refresh();
            utilCanvasAutoFrontal.draw();
            sap.ui.core.BusyIndicator.hide();
        },
        onCancelPointInspeccion2: function (event) {
            // var oItem = event.getSource().getSelectedItem().getBindingContext().getObject();
            sap.ui.core.BusyIndicator.show();
            console.log(event.getSource().getBindingContext().getObject());
            console.log(event.getSource());
            console.log(event);
            this.getView().byId("dlg_inspeccion").open();
            var data = this.getView().getModel().getProperty("/listaInspeccion");
            var dataNew = [];
            var Contador = 1;
            for (var i = 0; i < data.length; i++) {
                var objCurrent = data[i];

                if (objCurrent.ItemNumero !== event.getSource().getBindingContext().getObject().ItemNumero) {
                    objCurrent.ItemNumero = Contador;
                    dataNew.push(objCurrent);
                    Contador++;
                }
            }
            utilCanvasAutoFrontal.selectedCoord = dataNew;
            this.getView().getModel().setProperty("/listaInspeccion", dataNew);
            this.getView().getModel().refresh();
            utilCanvasAutoFrontal.draw();
            utilCanvasAutoFrontal.printInspeccion();
            this.getView().byId("dlg_inspeccion").close();
            sap.ui.core.BusyIndicator.hide();
        },
        onCheckServicio: function () {
            if (this.getView().byId("check_servicio").getSelected()) {
                this.getView().byId("cbo_tipo_mantencion").setEnabled(true);
            } else {
                this.getView().byId("cbo_tipo_mantencion").setEnabled(false);
            }

        },
        onCheckSeguro: function () {

            if (this.getView().byId("check_com_seguro").getSelected()) {
                this.getView().byId("ele_cbo_com_seguro").setVisible(true);
                this.getView().byId("ele_txt_com_seguro").setVisible(true);
            } else {
                this.getView().byId("ele_cbo_com_seguro").setVisible(false);
                this.getView().byId("ele_txt_com_seguro").setVisible(false);
            }

        },
        onChangeInput: function (oEvent) {
            var value = oEvent.getSource().getValue();
            console.log(oEvent);

            if (value === "NaN") {
                oEvent.oSource.setValue("");
                return;
            }

            if (value === "") {
                oEvent.oSource.setValue("");
                return;
            }

            if (!value) {
                oEvent.oSource.setValue("");
                return;
            }

            if (isNaN(value)) {
                oEvent.oSource.setValue("");
            } else {
                var floatValue = parseFloat(value);

                if (isNaN(floatValue)) {
                    oEvent.oSource.setValue("");
                    return;
                }

                if (floatValue < 0.1111111) {
                    oEvent.oSource.setValue("");
                } else {
                    oEvent.oSource.setValue(floatValue.toFixed(0));
                }
            }
        },
        onSaveRecepccion: function () {

            var is_servicio = this.getView().byId("check_servicio").getSelected();
            var tipo_mantencion = this.getView().byId("cbo_tipo_mantencion").getSelectedKey();
            var is_dp = this.getView().byId("check_dp").getSelected();
            var is_inspeccion = this.getView().byId("check_inspeccion").getSelected();
            var is_presupuesto = this.getView().byId("check_presupuesto").getSelected();
            var is_chequeo_general = this.getView().byId("check_general").getSelected();
            var observaciones_orden_servicio = this.getView().byId("txt_observaciones").getValue();
            var is_plumillas = this.getView().byId("check_plumillas").getSelected();
            var is_radio = this.getView().byId("check_radio").getSelected();
            var is_piso_goma = this.getView().byId("check_piso_goma").getSelected();
            var is_gata = this.getView().byId("check_gata").getSelected();
            var is_accesorios = this.getView().byId("check_accesorios").getSelected();
            var is_heramientas = this.getView().byId("check_heramientas").getSelected();
            var is_panel_radio = this.getView().byId("check_panel_radio").getSelected();
            var is_encendedor = this.getView().byId("check_encendedor").getSelected();
            var is_seguridad = this.getView().byId("check_seguridad").getSelected();
            var is_tapa_ruedas = this.getView().byId("check_tapa_ruedas").getSelected();
            var is_tag = this.getView().byId("check_tag").getSelected();
            var is_ruedas_repuesto = this.getView().byId("check_ruedas_repuesto").getSelected();
            var kilometraje = this.getView().byId("txt_kilometraje").getValue();
            var nivel_combustible = this.getView().byId("sld_nivel_combustible").getValue();
            var is_seguro = this.getView().byId("check_ruedas_repuesto").getSelected();
            var seguro = this.getView().byId("cbo_com_seguro").getSelectedKey();
            var otro_seguro = this.getView().byId("txt_com_seguro").getValue();
            var color_cono = this.getView().byId("txt_color_cono").getValue();
            var nro_cono = this.getView().byId("txt_nro_cono").getValue();
            var nro_locker = this.getView().byId("txt_nro_locker").getValue();
            var nro_llave = this.getView().byId("txt_nro_llave").getValue();
            var observaciones_recepcion = this.getView().byId("txt_observaciones_recepcion").getValue();
            var cuando = this.getView().byId("txt_cuando").getValue();
            var donde = this.getView().byId("txt_donde").getValue();
            var frecuencia = this.getView().byId("txt_frecuencia").getValue();
            var fecha_entrega = this.getView().byId("dp_fecha_entrega").getValue();
            var condicion_pago = this.getView().byId("cbo_condicion_pago").getSelectedKey();
            var agenda = this.getView().getModel().getProperty("/Agenda");

            this.getView().byId("cbo_tipo_mantencion").setValueState("None");
            this.getView().byId("txt_kilometraje").setValueState("None");
            this.getView().byId("txt_com_seguro").setValueState("None");
            this.getView().byId("txt_color_cono").setValueState("None");
            this.getView().byId("txt_nro_cono").setValueState("None");
            this.getView().byId("txt_cuando").setValueState("None");
            this.getView().byId("txt_donde").setValueState("None");
            this.getView().byId("txt_frecuencia").setValueState("None");
            this.getView().byId("check_inspeccion").setValueState("None");
            this.getView().byId("check_presupuesto").setValueState("None");
            this.getView().byId("check_general").setValueState("None");

            if (is_servicio) {

                if (tipo_mantencion === "0") {

                    this.getView().byId("tab_menu").setSelectedKey("orden_servicio_icon");
                    this.getView().byId("cbo_tipo_mantencion").focus();
                    this.getView().byId("cbo_tipo_mantencion").setValueState("Error");
                    this.errorMensaje("Seleccione una mantención");
                    return;
                }

            }

            if (!is_dp) {

                if (!is_inspeccion && !is_presupuesto && !is_chequeo_general) {

                    this.getView().byId("tab_menu").setSelectedKey("orden_servicio_icon");
                    this.getView().byId("check_inspeccion").focus();
                    this.getView().byId("check_inspeccion").setValueState("Error");
                    this.getView().byId("check_presupuesto").setValueState("Error");
                    this.getView().byId("check_general").setValueState("Error");
                    this.errorMensaje("Seleccione un tipo de servicio");
                    return;
                }

            }

            if (!kilometraje) {
                this.getView().byId("tab_menu").setSelectedKey("orden_servicio_icon");
                this.getView().byId("txt_kilometraje").focus();
                this.getView().byId("txt_kilometraje").setValueState("Error");
                this.errorMensaje("Ingrese el kilometraje");
                return;
            }

            if (is_seguro) {

                if (seguro === "0" && !otro_seguro) {
                    this.getView().byId("tab_menu").setSelectedKey("recepcion_icon");
                    this.getView().byId("txt_com_seguro").focus();
                    this.getView().byId("txt_com_seguro").setValueState("Error");
                    this.errorMensaje("Ingrese el nombre de su seguro");
                    return;
                }

            }

            if (!color_cono) {
                this.getView().byId("tab_menu").setSelectedKey("recepcion_icon");
                this.getView().byId("txt_color_cono").focus();
                this.getView().byId("txt_color_cono").setValueState("Error");
                this.errorMensaje("Ingrese el color del cono");
                return;
            }

            if (!nro_cono) {
                this.getView().byId("tab_menu").setSelectedKey("recepcion_icon");
                this.getView().byId("txt_nro_cono").focus();
                this.getView().byId("txt_nro_cono").setValueState("Error");
                this.errorMensaje("Ingrese el número del cono");
                return;
            }

            if (observaciones_recepcion) {

                if (!cuando) {
                    this.getView().byId("tab_menu").setSelectedKey("recepcion_icon");
                    this.getView().byId("txt_cuando").focus();
                    this.getView().byId("txt_cuando").setValueState("Error");
                    this.errorMensaje("Ingrese cuando ocurrio la observación");
                    return;
                }

                if (!donde) {
                    this.getView().byId("tab_menu").setSelectedKey("recepcion_icon");
                    this.getView().byId("txt_donde").focus();
                    this.getView().byId("txt_donde").setValueState("Error");
                    this.errorMensaje("Ingrese donde ocurrio la observación");
                    return;
                }

                if (!frecuencia) {
                    this.getView().byId("tab_menu").setSelectedKey("recepcion_icon");
                    this.getView().byId("txt_frecuencia").focus();
                    this.getView().byId("txt_frecuencia").setValueState("Error");
                    this.errorMensaje("Ingrese con cuanta frecuencia se presenta esta observación");
                    return;
                }

            }

            this.generateIdRecepcion();
            var ObjRecepcion = {};
            ObjRecepcion.RECEPCION_ID = this.IdRecepcion;
            ObjRecepcion.RECEPCION_OS_OBSERVACIONES = observaciones_orden_servicio;
            ObjRecepcion.RECEPCION_OS_KILOMETRAJE = kilometraje;
            ObjRecepcion.RECEPCION_OS_NIV_COMB = nivel_combustible.toString();
            ObjRecepcion.RECEPCION_OS_IS_SERVICIO = this.castBool2String(is_servicio);
            ObjRecepcion.RECEPCION_OS_TIPO_MANTENCION = parseInt(tipo_mantencion);
            ObjRecepcion.RECEPCION_OS_IS_DYP = this.castBool2String(is_dp);
            ObjRecepcion.RECEPCION_OS_VEHICULO = parseInt(agenda.VEHICULO_ID);
            ObjRecepcion.RECEPCION_OS_INSPECCION = this.castBool2String(is_inspeccion);
            ObjRecepcion.RECEPCION_OS_CHEQUEO_GEN = this.castBool2String(is_chequeo_general);
            ObjRecepcion.RECEPCION_OS_PRESUPUESTO = this.castBool2String(is_presupuesto);
            ObjRecepcion.RECEPCION_OS_PLUMILLAS = this.castBool2String(is_plumillas);
            ObjRecepcion.RECEPCION_OS_GATA = this.castBool2String(is_gata);
            ObjRecepcion.RECEPCION_OS_PANEL_RADIO = this.castBool2String(is_panel_radio);
            ObjRecepcion.RECEPCION_OS_TAPA_RUEDAS = this.castBool2String(is_tapa_ruedas);
            ObjRecepcion.RECEPCION_OS_RADIO = this.castBool2String(is_radio);
            ObjRecepcion.RECEPCION_OS_ACCESORIOS = this.castBool2String(is_accesorios);
            ObjRecepcion.RECEPCION_OS_ENCENDEDOR = this.castBool2String(is_encendedor);
            ObjRecepcion.RECEPCION_OS_TAG = this.castBool2String(is_tag);
            ObjRecepcion.RECEPCION_OS_PISO_GOMA = this.castBool2String(is_piso_goma);
            ObjRecepcion.RECEPCION_OS_HERRAMIENTAS = this.castBool2String(is_heramientas);
            ObjRecepcion.RECEPCION_OS_KIT_SEGURIDAD = this.castBool2String(is_seguridad);
            ObjRecepcion.RECEPCION_OS_RUEDA_REPUESTO = this.castBool2String(is_ruedas_repuesto);
            ObjRecepcion.RECEPCION_IS_SEGURO = this.castBool2String(is_seguro);
            ObjRecepcion.RECEPCION_FECHA_ENTREGA_EST = fecha_entrega;
            ObjRecepcion.RECEPCION_SEGURO = parseInt(seguro);
            ObjRecepcion.RECEPCION_SEGURO_OTRO = otro_seguro;
            ObjRecepcion.RECEPCION_COLOR_CONO = color_cono;
            ObjRecepcion.RECEPCION_NRO_CONO = nro_cono;
            ObjRecepcion.RECEPCION_NRO_LOCKER = nro_locker;
            ObjRecepcion.RECEPCION_NRO_LLAVE = nro_llave;
            ObjRecepcion.RECEPCION_DONDE = donde;
            ObjRecepcion.RECEPCION_CUANDO = cuando;
            ObjRecepcion.RECEPCION_FRECUENCIA = frecuencia;
            ObjRecepcion.RECEPCION_AGENDADO = "1";
            ObjRecepcion.RECEPCION_CONDICION_PAGO = parseInt(condicion_pago);
            ObjRecepcion.RECEPCION_AGENDA = parseInt(agenda.AGENDA_ID);
            ObjRecepcion.RECEPCION_FECHA_REG = "01/01/2017 06:00:00";
            ObjRecepcion.RECEPCION_USUARIO_REG = "USUARIO 001";
            ObjRecepcion.RECEPCION_ESTADO = "AC";
            var self = this;
            sap.ui.core.BusyIndicator.show();
            recepcionService.registrar(ObjRecepcion, function (result) {
                console.log(result);

                if (result.c === "s") {

                    self.onSaveInspeccion(ObjRecepcion.RECEPCION_ID);

                }

                if (result.c === "ex") {

                    sap.ui.core.BusyIndicator.hide();
                    self.errorMensaje("Error al registrar recepción");
                }
            });
        },
        onSaveInspeccion: function (recepcionId) {

            var listInpsecciones = this.getView().getModel().getProperty("/listaInspeccion");
            var listEntry = [];

            for (var i = 0; i < listInpsecciones.length; i++) {
                var objCurrent = listInpsecciones[i];
                var obj = {};

                obj.ID = this.generateIdRecepcion();
                obj.P_INSPECCION_ID = objCurrent.Inspeccion.PINSPECCION_ID;
                obj.OCURRENCIA_ID = 0;
                obj.OCURRENCIA = objCurrent.OcurrenciasText.toString();
                obj.COMENTARIO = objCurrent.Comentario;
                obj.COORD_X = objCurrent.Coordenadas.X;
                obj.COORD_Y = objCurrent.Coordenadas.Y;
                obj.RECEPCION_ID = recepcionId;
                obj.ESTADO = "AC";

                listEntry.push(obj);

            }
            var self = this;
            if (listEntry.length > 0) {
                recepcionService.registraInspecciones(listEntry, function (result) {
                    console.log(result);
                    sap.ui.core.BusyIndicator.hide();
                    if (result.c === "s") {

                        self.successMensaje("Recepción Registrada Correctamente");
                        self.CancelarInspeccion();
                    }

                    if (result.c === "ex") {

                        self.errorMensaje("Error al registrar inspecciones");
                    }

                });
            } else {
                sap.ui.core.BusyIndicator.hide();
                self.successMensaje("Recepción Registrada Correctamente");
                self.CancelarInspeccion();
            }

        },
        CancelarInspeccion: function () {
            this.getView().getModel().setProperty("/Agenda", {});
            this.getView().getModel().setProperty("/ActivaIconos", false);
            this.getView().getModel().setProperty("/listaInspeccion", []);
            this.getView().getModel().setProperty("/Inspeccion", {
                ItemNumero: 0,
                Inspeccion: {},
                Ocurrencias: [],
                OcurrenciasText: [],
                Comentario: "",
                Coordenadas: {}
            });

            this.IconoSeleccionado = "";
            this.CanvasInicializado = false;
            this.IdRecepcion = 0;
            this.onCargarAgendas();
            this.getView().getModel().refresh();
            this.getView().byId("tab_menu").setSelectedKey("tab_cliente");
            utilCanvasAutoFrontal.clearRegion();
        },
        errorMensaje: function (Mensaje) {
            MessageBox.error(
                    Mensaje, {
                        styleClass: "sapUiSizeCompact"
                    }
            );
        },
        successMensaje: function (Mensaje) {
            MessageBox.success(
                    Mensaje, {
                        styleClass: "sapUiSizeCompact"
                    }
            );
        },
        generateIdRecepcion: function () {
            this.IdRecepcion = (this.getRandomInt(10000, 100000) * this.getRandomInt(1, 20)) + this.getRandomInt(1, 1000000);
            return this.IdRecepcion;
        },
        getRandomInt: function (min, max) {
            return Math.floor(Math.random() * (max - min + 1)) + min;
        },
        castBool2String: function (val) {

            if (val) {
                return "1";
            }

            return "0";
        },
        openFilter: function () {

            this.getView().byId("dlg_filtros").open();

        },
        closeFilter: function () {
            var listaTotal = this.getView().getModel().getProperty("/agendaListaTotalModel");
            this.getView().getModel().setProperty("/agendaListaModel", listaTotal);
            this.getView().getModel().refresh();

            this.getView().byId("dlg_filtros").close();
        },
        goFilter: function () {

            var listaTotal = this.getView().getModel().getProperty("/agendaListaTotalModel");
            var listaDisplay = [];
            console.log(listaTotal);
            var fecha_ini = this.getView().byId(this.createId("dp_ini_filtro")).getValue();
            var fecha_fin = this.getView().byId(this.createId("dp_fin_filtro")).getValue();
            var marca = this.getView().byId(this.createId("txt_marca_filtro")).getValue();
            var modelo = this.getView().byId(this.createId("txt_modelo_filtro")).getValue();
            var anio = this.getView().byId(this.createId("txt_anio_filtro")).getValue();
            //   this.getView().getModel().setProperty("/agendaListaModel");
            for (var i = 0; i < listaTotal.length; i++) {
                var encontrado = false;
                if (fecha_ini && fecha_fin && !encontrado) {
                    var dateIni = this.castStringToDate(fecha_ini + " 00:00:00");
                    var dateFin = this.castStringToDate(fecha_fin + " 00:00:00");
                    var dateFinCurrent = this.castStringToDate(listaTotal[i].AGENDA_FECHA_FIN);

                    if (dateIni < dateFinCurrent && dateFin > dateFinCurrent) {
                        listaDisplay.push(listaTotal[i]);
                        encontrado = true;
                    }
                }

                if (marca && !encontrado) {

                    var valor_marca = listaTotal[i].VEHICULO_MARCA;
                    if (valor_marca.indexOf(marca) > -1) {
                        listaDisplay.push(listaTotal[i]);
                        encontrado = true;
                    }
                }

                if (modelo && !encontrado) {

                    var valor_modelo = listaTotal[i].VEHICULO_MODELO;

                    if (valor_modelo.indexOf(modelo) > -1) {

                        listaDisplay.push(listaTotal[i]);
                        encontrado = true;
                    }
                }

                if (anio && !encontrado) {
                    var valor_anio = listaTotal[i].VEHICULO_ANIO;
                    if (valor_anio.indexOf(anio) > -1) {
                        listaDisplay.push(listaTotal[i]);
                        encontrado = true;
                    }
                }
            }
            this.getView().getModel().setProperty("/agendaListaModel", listaDisplay);
            this.getView().getModel().refresh();
        },
        handleSearchBox: function () {
            var cad = this.getView().byId("txt_search").getValue().toUpperCase();
            var listaTotal = this.getView().getModel().getProperty("/agendaListaTotalModel");
            var listaDisplay = [];

            for (var i = 0; i < listaTotal.length; i++) {
                var obj = listaTotal[i];
                if (obj.CLIENTE_NRO_DOC.toUpperCase().indexOf(cad) > -1 ||
                        obj.CLIENTE_NOMBRES.toUpperCase().indexOf(cad) > -1 ||
                        obj.CLIENTE_APE_PATERNO.toUpperCase().indexOf(cad) > -1 ||
                        obj.CLIENTE_APE_MATERNO.toUpperCase().indexOf(cad) > -1 ||
                        obj.VEHICULO_PLACA.toUpperCase().indexOf(cad) > -1) {

                    listaDisplay.push(listaTotal[i]);
                }
            }

            this.getView().getModel().setProperty("/agendaListaModel", listaDisplay);
            this.getView().getModel().refresh();
        },

        //CAMARA
        openCamara: function () {
            this.getView().byId("txt_comentario_fotografia").setValue("");
            var idVideo = "video_photo_" + (new Date()).getTime().toString();
            this.idVideo = idVideo;
            $("#contentVideos").append("<div id='div_cont_" + this.idVideo + "'><video id='" + this.idVideo +
                    "' class='videos_inspeccion' width='480' height='360' autoplay></video></div>");
            var videos = $(".videos_inspeccion");

            for (var i = 0; i < videos.length; i++) {
                var video = videos[i];
                $("#div_cont_" + video.id).hide();
                if (i === videos.length - 1) {
                    $("#div_cont_" + video.id).show();
                }
            }
            //	this.getView().byId('htmlContentVistaCamara').setContent("<div id='contentVideos'></div>");
            var self = this;
            setTimeout(function () {

                var video = document.getElementById(self.idVideo);

                var errBack = function (err) {
                    console.log(err);
                };
                // Get access to the camera!
                if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
                    // Not adding `{ audio: true }` since we only want video now
                    navigator.mediaDevices.getUserMedia({
                        video: true
                    }).then(function (stream) {
                        video.src = window.URL.createObjectURL(stream);
                        video.play();
                    }, errBack);
                } else if (navigator.getUserMedia) { // Standard
                    navigator.getUserMedia({
                        video: true
                    }, function (stream) {
                        video.src = stream;
                        video.play();
                    }, errBack);
                } else if (navigator.webkitGetUserMedia) { // WebKit-prefixed
                    navigator.webkitGetUserMedia({
                        video: true
                    }, function (stream) {
                        video.src = window.webkitURL.createObjectURL(stream);
                        video.play();
                    }, errBack);
                } else if (navigator.mozGetUserMedia) { // Mozilla-prefixed
                    navigator.mozGetUserMedia({
                        video: true
                    }, function (stream) {
                        video.src = window.URL.createObjectURL(stream);
                        video.play();
                    }, errBack);
                }

            }, 1000);

            //	this.CamaraInicializado = true;
            this.getView().byId("dlg_foto").open();
        },
        closeCamara: function () {
            this.getView().byId("dlg_foto").close();
        },
        TakePhoto: function () {

            var self = this;
            var grid = self.getView().byId("gridFotos");
            grid.removeAllContent();
            var canvas;
            var context;
            var videos = $(".videos_inspeccion");
            for (var i = 0; i < videos.length; i++) {
                var video = videos[i];

                canvas = document.createElement('canvas');
                canvas.width = 640;
                canvas.height = 640;

                context = canvas.getContext('2d');
                context.drawImage(video, 0, 0, 640, 640);

                var oDataImage = new sap.m.Image({
                    src: canvas.toDataURL('image/png'),
                    width: "100%",
                    press: function (event) {

                        var dialog = new sap.m.Dialog({
                            title: 'Fotografia',
                            contentWidth: '100%',
                            contentHeigth: '100%',
                            beginButton: new sap.m.Button({
                                text: 'Close',
                                press: function () {
                                    dialog.close();
                                }
                            })
                        });

                        var imageTotal = new sap.m.Image({
                            src: event.oSource.mProperties.src,
                            width: "100%"});

                        dialog.addContent(imageTotal);

                        dialog.open();
                    }});
                var comentario = new String(this.getView().byId("txt_comentario_fotografia").getValue());
                var comentarioAux = comentario.valueOf();
                //comentario = this.getView().byId("txt_comentario_fotografia").getValue();
                var text = new sap.m.TextArea({
                    value: comentarioAux,
                    width: "100%",
                    editable: false
                });


                var panelContenedor = new sap.m.Panel();
                panelContenedor.addContent(oDataImage);
                panelContenedor.addContent(text);

                grid.addContent(panelContenedor);

                //this.getView().byId("txt_comentario_fotografia").setValue("");
            }

            this.closeCamara();
        }
        //CAMARA

    });
});