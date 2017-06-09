sap.ui.define([
    "sap/ui/model/json/JSONModel",
    'sap/m/MessageBox',
    "sap/ui/core/UIComponent",
    "sap/m/MessageToast",
	"sap/ui/core/mvc/Controller",
	"pe/seidor/sap/comagenda_vehiculo/services/ubigeoService",
	"pe/seidor/sap/comagenda_vehiculo/services/agendaService",
	"pe/seidor/sap/comagenda_vehiculo/services/giroComercialService",
	"pe/seidor/sap/comagenda_vehiculo/services/clienteService",
	"pe/seidor/sap/comagenda_vehiculo/services/tipoDocumentoService",
	"sap/ui/model/Filter",
	"pe/seidor/sap/comagenda_vehiculo/services/vehiculoService"
], function(Controller,ubigeoService,agendaService,giroComercialService,
			clienteService,tipoDocumentoService,vehiculoService) {
	"use strict";

	return Controller.extend("pe.seidor.sap.comagenda_vehiculo.controller.Home", {
 onInit: function() {
 	
 	
 	
                var oData =   {
                  "Products": [
                    { "Name": "Carlos Rodriguez", "Description": "Vehiculo 01"},
                    { "Name": "Juan Seminario", "Description": "Vehiculo 02"},
                    { "Name": "Eduardo Vargas", "Description": "Vehiculo 03 "},
                    { "Name": "Maria Rojas", "Description": "Vehiculo 04"},
                    { "Name": "Enrique Verde", "Description": "Vehiculo 05"},
                    { "Name": "Juana Torres", "Description": "Vehiculo 06"},
                    { "Name": "Miguel Fonseca", "Description": "Vehiculo 07 "},
                    { "Name": "Alan Garcia", "Description": "Vehiculo 08"},
                    { "Name": "Kevin Aguayo", "Description": "Vehiculo 09"},
                    { "Name": "Alexandra Valverde", "Description": "Vehiculo 10"},
                    { "Name": "Angel Cruz", "Description": "Vehiculo 11 "},
                    { "Name": "JeanPierre Rios", "Description": "Vehiculo 12"}
                  ],
                  "Selected": true
                };
                this.getView().byId("list").setModel(new sap.ui.model.json.JSONModel(oData));


                  var mData = {
                  "items": [
                   {
                  "key": "DZ",
                 "text": "Algeria"
                      },
                        {
                   "key": "AR",
                    "text": "Argentina"
                      },
                   {
                     "key": "AU",
                 "text": "Australia"
  }
]};
                    this.getView().byId("ComboMantencion").setModel(new sap.ui.model.json.JSONModel(mData));


                    
              }
              
              /*
              onSelectionChange: function(event) {

                  var cliente = event.getSource().getSelectedItem().getBindingContext().getObject().Name;

                  var auto = event.getSource().getSelectedItem().getBindingContext().getObject().Description;

               //   sap.ui.xmlfragment("pe.com.ibm.sap.dev.view.Contenedor", this).byId("txtNombre").setText(cliente);
                //  this.getView().byId("txtNombre").setText(cliente);

                console.log(JSON.stringify(event.getSource().getSelectedItem().getBindingContext().getObject()));

               this._getDialog().open();


               // alert(this.getView("ContenedorFrag").byId("txtNombre"));
              },
        _getFragment : function () {
         // create dialog lazily
         if (!this._Dialog) {
            // create dialog via fragment factory
            this._Dialog = sap.ui.xmlfragment("pe.com.ibm.sap.dev.view.Contenedor", this);
            // connect dialog to view (models, lifecycle)
            this.getView().addDependent(this._Dialog);
         }
         return this._Dialog;
      },
         _getDialog : function () {
         // create dialog lazily
         if (!this._oDialog) {
            // create dialog via fragment factory
            this._oDialog = sap.ui.xmlfragment("pe.com.ibm.sap.dev.view.Contenedor", this);
            // connect dialog to view (models, lifecycle)
            this.getView().addDependent(this._oDialog);
         }
         return this._oDialog;
      },
        onOpenDialog: function() {
            this._getDialog().open();
        },
   

        OpenNavegar: function(){

               var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
               oRouter.navTo("appRecepcion");
        },

        onOpenDialog2: function() {

            this._getDialog().close();
            this._getFragment().open();


            
        },

        onClose: function() {
             
        

             this._getFragment().close();
        }
*/
	});
});