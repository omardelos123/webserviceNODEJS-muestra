'use strict'
const express = require('express');
const app = express();
const sql = require('mssql'); //para la conexion.  
var modulos = require('./exportar');
// const server2 = require('http').createServer(app)
const http = require('http').Server(app)
//variables para configuracion del socket io
// const io = require('socket.io')(server);
const puerto = process.env.PORT || 3000;


/*validacion para comprobar que el server esta arriba 
si no entonces lo vuelve a levantar */


// server2 = app.listen(3000, console.log("Socket.io Hello Wolrd server started!"));
const cnn = http.listen(puerto, function() {

    console.log('Listening on port ' + puerto);

    cnn.setTimeout(60000);// 60 segundos de espera

});
// CONFIGURACIONES DEL SERVIDOR
// app.set('port', process.env.PORT || 3000)

// MIDDLEWARES (Funciones que se ejecutan antes de que preceses algo)
// app.use(express.urlencoded({ extended: false }));

app.use(express.json({limit: '50mb'})); //recibe o combierte la informaciona json para ser lejible por express.
app.use(express.urlencoded({limit: '50mb'}));

// CRUDs
modulos.router.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});
app.use(require('./routes/CRUD/CRUD_compania'));
app.use(require('./routes/CRUD/CRUD_almacen'));
app.use(require('./routes/CRUD/CRUD_roles'));
app.use(require('./routes/CRUD/CRUD_menu'));
app.use(require('./routes/CRUD/CRUD_usuarios'));
app.use(require('./routes/CRUD/CRUD_pais'));
app.use(require('./routes/CRUD/CRUD_provincia'));
app.use(require('./routes/CRUD/CRUD_distrito'));
app.use(require('./routes/CRUD/CRUD_tipo_de_personal'));
app.use(require('./routes/CRUD/CRUD_personal'));
app.use(require('./routes/CRUD/CRUD_servicios'));
app.use(require('./routes/CRUD/CRUD_tipo_sistemas'));
app.use(require('./routes/CRUD/CRUD_destino'));
app.use(require('./routes/CRUD/CRUD_modelo'));
app.use(require('./routes/CRUD/CRUD_permisos'));
app.use(require('./routes/CRUD/CRUD_clase_de_equipo'));
app.use(require('./routes/CRUD/CRUD_fabricantes'));
app.use(require('./routes/CRUD/CRUD_tipo_combustible'));
app.use(require('./routes/CRUD/CRUD_sistemas'));

app.use(require('./routes/CRUD/CRUD_tipo_de_deficiencia'));
app.use(require('./routes/CRUD/CRUD_tipo_de_mantenimiento'));
app.use(require('./routes/CRUD/CRUD_deficiencia'));


app.use(require('./routes/CRUD/CRUD_proveedores'));
app.use(require('./routes/CRUD/CRUD_unidades'));
app.use(require('./routes/CRUD/CRUD_ubicacion'));
app.use(require('./routes/CRUD/CRUD_catalogo_de_repuesto'));
app.use(require('./routes/CRUD/CRUD_prioridades'));

app.use(require('./routes/CRUD/CRUD_combustible'));
app.use(require('./routes/CRUD/CRUD_tipo_estatus'));
app.use(require('./routes/CRUD/CRUD_estatus'));
app.use(require('./routes/CRUD/CRUD_despachos'));

app.use(require('./routes/CRUD/CRUD_almacen_compania'));
app.use(require('./routes/CRUD/CRUD_catalogo_de_compania'));

app.use(require('./routes/CRUD/CRUD_forma_pago'));



app.use(require('./routes/GEN/GEN_login_control_acceso'));
app.use(require('./routes/GEN/GEN_lista_pedidos_deficiencia'));
app.use(require('./routes/GEN/GEN_lista_sistemas_despachables_sin_despachar'));
app.use(require('./routes/GEN/GEN_lista_parte_proveedor'));
app.use(require('./routes/GEN/GEN_lista_proveedor_parte'));

app.use(require('./routes/CRUD/CRUD_pedidos'));
app.use(require('./routes/CRUD/CRUD_detalle_pedidos'));
app.use(require('./routes/GEN/GEN_detalle_pedidos'));
app.use(require('./routes/GEN/GEN_eliminar_pedido'));
app.use(require('./routes/GEN/GEN_tarea'));
app.use(require('./routes/CRUD/CRUD_recibir_pedidos'));
app.use(require('./routes/GEN/GEN_recibir_pedidos'));
app.use(require('./routes/GEN/GEN_requisiciones'));


app.use(require('./routes/GEN/GEN_Actualizar_pedido_inventario'));
app.use(require('./routes/GEN/GEN_actualizar_detalle_pedidos'));
app.use(require('./routes/GEN/GEN_eliminar_recibir_pedido'));
app.use(require('./routes/GEN/GEN_verificar_lista_inventario'));
app.use(require('./routes/GEN/GEN_actualizar_pedido_sw_estado'));
app.use(require('./routes/GEN/PROC_dashboard'));
app.use(require('./routes/CRUD/CRUD_historico_pedidos'));

app.use(require('./routes/GEN/GEN_entrada_historico'));
app.use(require('./routes/GEN/GEN_movimiento_de_inventario'));

app.use(require('./routes/GEN/GEN_administrativos_para_orden_t'));
app.use(require('./routes/GEN/GEN_deficiencias_by_id_sistemas'));
app.use(require('./routes/GEN/GEN_requisiciones_by_id_deficiencia'));
app.use(require('./routes/CRUD/CRUD_orden_de_trabajo'));
app.use(require('./routes/GEN/GEN_insert_tareas_orden_de_trabajo'));

app.use(require('./routes/GEN/GEN_lista_parte_fabricante'));
app.use(require('./routes/GEN/GEN_fabricantes'));

app.use(require('./routes/GEN/GEN_validador_de_cantidad_autorizadas_y_minimos'));
app.use(require('./routes/GEN/GEN_detalles_pedidos'));

app.use(require('./routes/CRUD/CRUD_posibles_fallas'));
app.use(require('./routes/GEN/GEN_prioridades_By_Id_tipo'));

app.use(require('./routes/GEN/GEN_catalogo_de_compania'));
app.use(require('./routes/GEN/GEN_orden_trabajo_by_Id'));

app.use(require('./routes/GEN/GEN_partes'));
app.use(require('./routes/GEN/GEN_DASHBOARD_PEDIDOS'));
app.use(require('./routes/GEN/GEN_DASHBOARD_NUMERO_PARTE'));
app.use(require('./routes/GEN/PROC_punto_reorden'));
app.use(require('./routes/GEN/PROC_notificacion_mantenimientos'));
app.use(require('./routes/GEN/PROC_notificacion_ordenes'));
app.use(require('./routes/GEN/GEN_procesa_deficiencia'));

app.use(require('./routes/GEN/GEN_DASHBOARD_DEFICIENCIAS_GRAFICOS'));
app.use(require('./routes/GEN/GEN_DASHBOARD_DEFICIENCIAS_GRID_DATOS'));

app.use(require('./routes/GEN/REP_cotizacion_pedido'));
app.use(require('./routes/GEN/REP_orden_trabajo'));
app.use(require('./routes/GEN/REP_inventario'));

app.use(require('./routes/GEN/GEN_detalles_pedido'));
app.use(require('./routes/GEN/GEN_cambio_contrasena'));
app.use(require('./routes/GEN/GEN_catalogo_de_repuesto'));
app.use(require('./routes/GEN/REP_despacho'));
app.use(require('./routes/GEN/GEN_obtener_img_usuario'));
app.use(require('./routes/GEN/GEN_valida_usuario'));
app.use(require('./routes/GEN/GEN_valida_equipo'));
app.use(require('./routes/CRUD/CRUD_licencias'));
app.use(require('./routes/PROC/envioCorreo'));

module.exports = { app, sql };