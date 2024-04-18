var modulos = require('../../exportar');
modulos.router.post('/GEN_detalles_pedido', (req, res) => {
   var resp_api_token=req.body.token;
    console.log('GEN_detalles_pedido');
    console.log("Recibiendo el token---->>>>"+resp_api_token);
    if (!req.body.token) {
        res.status(401).send({
            error: "Es necesario el token de autenticación"
        });
        return
    } else {
        var valido = modulos._token.validar(req.body.token);
        if (valido == true) {
            var Type_DETALLES_PEDIDO = new modulos.sql.Table();
            Type_DETALLES_PEDIDO.columns.add('id_compania', modulos.sql.Int);
            Type_DETALLES_PEDIDO.columns.add('id_pedido', modulos.sql.Int);
            Type_DETALLES_PEDIDO.columns.add('linea', modulos.sql.Int);
            Type_DETALLES_PEDIDO.columns.add('cantidad', modulos.sql.Int);
            Type_DETALLES_PEDIDO.columns.add('id_proveedor', modulos.sql.Int);
            Type_DETALLES_PEDIDO.columns.add('nombre_proveedor', modulos.sql.NVarChar(150));
            Type_DETALLES_PEDIDO.columns.add('id_fabricante', modulos.sql.Int);
            Type_DETALLES_PEDIDO.columns.add('nombre_fabricante', modulos.sql.NVarChar(150));
            Type_DETALLES_PEDIDO.columns.add('manejo_de_envio', modulos.sql.Numeric(18, 2));
            Type_DETALLES_PEDIDO.columns.add('id_parte', modulos.sql.Int);
            Type_DETALLES_PEDIDO.columns.add('nombre_parte', modulos.sql.NVarChar(150));
            Type_DETALLES_PEDIDO.columns.add('id_unidad', modulos.sql.Int);
            Type_DETALLES_PEDIDO.columns.add('nombre_unidad', modulos.sql.NVarChar(150));
            Type_DETALLES_PEDIDO.columns.add('id_tarea', modulos.sql.Int);
            Type_DETALLES_PEDIDO.columns.add('nombre_tarea', modulos.sql.NVarChar(150));
            Type_DETALLES_PEDIDO.columns.add('preciounitario', modulos.sql.Numeric(18, 2));
            Type_DETALLES_PEDIDO.columns.add('total', modulos.sql.Numeric(18, 2));
            Type_DETALLES_PEDIDO.columns.add('descuento', modulos.sql.Numeric(18, 2));
            Type_DETALLES_PEDIDO.columns.add('usurario_crea', modulos.sql.Int);
            Type_DETALLES_PEDIDO.columns.add('fecha_crea', modulos.sql.DateTime);
            Type_DETALLES_PEDIDO.columns.add('usuario_actualiza', modulos.sql.Int);
            Type_DETALLES_PEDIDO.columns.add('fecha_actualiza', modulos.sql.DateTime);
            Type_DETALLES_PEDIDO.columns.add('sw_activo', modulos.sql.Int);
            console.log("array tamaño---->>>  ",req.body.matriz.length);
           for (var i = 0; i < req.body.matriz.length; i++) {
        
               // console.log("<<<<----->>>>>  ",req.body[i][11]);
               //console.log("<<<<----->>>>>  ",req.body[i][8]);
               //Type_DETALLE_PEDIDO.rows.add(i, 1, 1, 1, 1, 1, 1, 1, 2.57, 1.89, 1, 1, 1, 1, 1);
              Type_DETALLES_PEDIDO.rows.add(req.body.matriz[i][0]
                                          ,req.body.matriz[i][1]
                                          ,req.body.matriz[i][2]
                                          ,req.body.matriz[i][3]
                                          ,req.body.matriz[i][4]
                                          ,req.body.matriz[i][5]//
                                          ,req.body.matriz[i][6]
                                          ,req.body.matriz[i][7]//
                                          ,req.body.matriz[i][8]
                                          ,req.body.matriz[i][9]
                                          ,req.body.matriz[i][10]//
                                          ,req.body.matriz[i][11]
                                          ,req.body.matriz[i][12]//
                                          ,req.body.matriz[i][13]
                                          ,req.body.matriz[i][14]//
                                          ,req.body.matriz[i][15]
                                          ,req.body.matriz[i][16]
                                          ,req.body.matriz[i][17]
                                          ,req.body.matriz[i][18]
                                          ,req.body.matriz[i][19]
                                          ,req.body.matriz[i][20]
                                          ,req.body.matriz[i][21]
                                          ,req.body.matriz[i][22]
                                          );//1, 1, 1, 1, 1, 1, 1, 1, 2.57, 1.89, 1, 1, 1, 1, 1);
           }
            
            // console.log("tabla------<<<<------>>>>>>>> ", Type_DETALLES_PEDIDOS);
            modulos.sql.connect(modulos.config, function (err) {
                var request = new modulos.sql.Request();
                request.input('tbl_detalles_pedidos', Type_DETALLES_PEDIDO);
                request.execute('GEN_detalles_pedido').then(function (rows) {
                   // console.log('err', err);
                   // console.log('recordsets', recordsets);
                   // console.log('returnValue', returnValue);
                    res.json(rows);
                    modulos.sql.close();
                }).catch(function (err) {
                    console.log(err);
                    res.json(err);
                    modulos.sql.close();
                });
        
            });
        } else {
            res.status(401).send({
                error: 'Token inválido'
            });
        }
    }
});

module.exports = modulos.router;
