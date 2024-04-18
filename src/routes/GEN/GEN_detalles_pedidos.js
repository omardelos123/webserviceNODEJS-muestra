var modulos = require('../../exportar');
modulos.router.post('/GEN_detalles_pedidos', (req, res) => {
    console.log('GEN_detalles_pedidos');
    if (!req.body.token) {
        res.status(401).send({
            error: "Es necesario el token de autenticación"
        });
        return
    } else {
        var valido = modulos._token.validar(req.body.token);
        if (valido == true) {
		    var Type_DETALLES_PEDIDOS = new modulos.sql.Table();
    Type_DETALLES_PEDIDOS.columns.add('id_compania', modulos.sql.Int);
    Type_DETALLES_PEDIDOS.columns.add('id_pedido', modulos.sql.Int);
    Type_DETALLES_PEDIDOS.columns.add('linea', modulos.sql.Int);
    Type_DETALLES_PEDIDOS.columns.add('cantidad', modulos.sql.Int);
    Type_DETALLES_PEDIDOS.columns.add('id_proveedor', modulos.sql.Int);
    Type_DETALLES_PEDIDOS.columns.add('nombre_proveedor', modulos.sql.NVarChar(150));
    Type_DETALLES_PEDIDOS.columns.add('id_fabricante', modulos.sql.Int);
    Type_DETALLES_PEDIDOS.columns.add('nombre_fabricante', modulos.sql.NVarChar(150));
    Type_DETALLES_PEDIDOS.columns.add('manejo_de_envio', modulos.sql.Numeric(18, 2));
    Type_DETALLES_PEDIDOS.columns.add('id_parte', modulos.sql.Int);
    Type_DETALLES_PEDIDOS.columns.add('nombre_parte', modulos.sql.NVarChar(150));
    Type_DETALLES_PEDIDOS.columns.add('id_unidad', modulos.sql.Int);
    Type_DETALLES_PEDIDOS.columns.add('nombre_unidad', modulos.sql.NVarChar(150));
    Type_DETALLES_PEDIDOS.columns.add('id_tarea', modulos.sql.Int);
    Type_DETALLES_PEDIDOS.columns.add('nombre_tarea', modulos.sql.NVarChar(150));
    Type_DETALLES_PEDIDOS.columns.add('preciounitario', modulos.sql.Numeric(18, 2));
    Type_DETALLES_PEDIDOS.columns.add('total', modulos.sql.Numeric(18, 2));
    Type_DETALLES_PEDIDOS.columns.add('usurario_crea', modulos.sql.Int);
    Type_DETALLES_PEDIDOS.columns.add('fecha_crea', modulos.sql.DateTime);
    Type_DETALLES_PEDIDOS.columns.add('usuario_actualiza', modulos.sql.Int);
    Type_DETALLES_PEDIDOS.columns.add('fecha_actualiza', modulos.sql.DateTime);
    Type_DETALLES_PEDIDOS.columns.add('sw_activo', modulos.sql.Int);
    console.log("array tamaño---->>>  ",req.body.length);
   for (var i = 0; i < req.body.length; i++) {

       // console.log("<<<<----->>>>>  ",req.body[i][11]);
       //console.log("<<<<----->>>>>  ",req.body[i][8]);
       //Type_DETALLE_PEDIDO.rows.add(i, 1, 1, 1, 1, 1, 1, 1, 2.57, 1.89, 1, 1, 1, 1, 1);
      Type_DETALLES_PEDIDOS.rows.add(req.body[i][0]
                                  ,req.body[i][1]
                                  ,req.body[i][2]
                                  ,req.body[i][3]
                                  ,req.body[i][4]
                                  ,req.body[i][5]//
                                  ,req.body[i][6]
                                  ,req.body[i][7]//
                                  ,req.body[i][8]
                                  ,req.body[i][9]
                                  ,req.body[i][10]//
                                  ,req.body[i][11]
                                  ,req.body[i][12]//
                                  ,req.body[i][13]
                                  ,req.body[i][14]//
                                  ,req.body[i][15]
                                  ,req.body[i][16]
                                  ,req.body[i][17]
                                  ,req.body[i][18]
                                  ,req.body[i][19]
                                  ,req.body[i][20]
                                  ,req.body[i][21] );//1, 1, 1, 1, 1, 1, 1, 1, 2.57, 1.89, 1, 1, 1, 1, 1);
   }
    
    // console.log("tabla------<<<<------>>>>>>>> ", Type_DETALLES_PEDIDOS);
    modulos.sql.connect(modulos.config, function (err) {
        var request = new modulos.sql.Request();
        request.input('tbl_detalles_pedidos', Type_DETALLES_PEDIDOS);
        request.execute('GEN_detalles_pedidos').then(function (err, recordsets, returnValue) {
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
