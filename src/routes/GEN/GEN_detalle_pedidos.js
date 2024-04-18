var modulos = require('../../exportar');
modulos.router.post('/GEN_detalle_pedidos', (req, res) => {
    console.log('GEN_detalle_pedidos');
    if (!req.body.token) {
        res.status(401).send({
            error: "Es necesario el token de autenticación"
        });
        return
    } else {
        var valido = modulos._token.validar(req.body.token);
        if (valido == true) {
		    var Type_DETALLE_PEDIDO = new modulos.sql.Table();
    Type_DETALLE_PEDIDO.columns.add('id_compania', modulos.sql.Int);
    Type_DETALLE_PEDIDO.columns.add('id_pedido', modulos.sql.Int);
    Type_DETALLE_PEDIDO.columns.add('id_proveedor', modulos.sql.Int);
    Type_DETALLE_PEDIDO.columns.add('linea', modulos.sql.Int);
    Type_DETALLE_PEDIDO.columns.add('cantidad', modulos.sql.Int);
    Type_DETALLE_PEDIDO.columns.add('id_parte', modulos.sql.Int);
    Type_DETALLE_PEDIDO.columns.add('id_unidad', modulos.sql.Int);
    Type_DETALLE_PEDIDO.columns.add('id_tarea', modulos.sql.Int);
    Type_DETALLE_PEDIDO.columns.add('precio_unitario', modulos.sql.Numeric(18, 2));
    Type_DETALLE_PEDIDO.columns.add('total', modulos.sql.Numeric(18, 2));
    Type_DETALLE_PEDIDO.columns.add('usurario_crea', modulos.sql.Int);
    Type_DETALLE_PEDIDO.columns.add('fecha_crea', modulos.sql.Date);
    Type_DETALLE_PEDIDO.columns.add('usuario_actualiza', modulos.sql.Int);
    Type_DETALLE_PEDIDO.columns.add('fecha_actualiza', modulos.sql.Date);
    Type_DETALLE_PEDIDO.columns.add('sw_activo', modulos.sql.Int);
    console.log("array tamaño---->>>  ",req.body.length);
   for (var i = 0; i < req.body.length; i++) {
        console.log("<<<<----->>>>>  ",req.body[i][11]);
       //console.log("<<<<----->>>>>  ",req.body[i][8]);
       //Type_DETALLE_PEDIDO.rows.add(i, 1, 1, 1, 1, 1, 1, 1, 2.57, 1.89, 1, 1, 1, 1, 1);
      Type_DETALLE_PEDIDO.rows.add(req.body[i][0],req.body[i][1],req.body[i][2],req.body[i][3],req.body[i][4],req.body[i][5],req.body[i][6],req.body[i][7],req.body[i][8],req.body[i][9],req.body[i][10],1,req.body[i][12],1,req.body[i][14]);//1, 1, 1, 1, 1, 1, 1, 1, 2.57, 1.89, 1, 1, 1, 1, 1);
   }
    
    console.log("tabla ", Type_DETALLE_PEDIDO);
    modulos.sql.connect(modulos.config, function (err) {
        var request = new modulos.sql.Request();
        request.input('detalle_pedidos', Type_DETALLE_PEDIDO);
        request.execute('GEN_detalle_pedidos').then(function (err, recordsets, returnValue) {
            console.log('err', err);
            console.log('recordsets', recordsets);
            console.log('returnValue', returnValue);
            res.json(rows);
            modulos.sql.close();
        }).catch(function (err) {
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