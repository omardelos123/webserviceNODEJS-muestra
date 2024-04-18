var modulos = require('../../exportar');
modulos.router.post('/GEN_recibir_pedidos', (req, res) => {
    console.log('GEN_recibir_pedidos');
    if (!req.body.token) {
        res.status(401).send({
            error: "Es necesario el token de autenticación"
        });
        return
    } else {
        var valido = modulos._token.validar(req.body.token);
        if (valido == true) {
		    var Type_recibir_pedidos = new modulos.sql.Table();
    Type_recibir_pedidos.columns.add('id_compania', modulos.sql.Int);
    Type_recibir_pedidos.columns.add('id_pedido', modulos.sql.Int);
    Type_recibir_pedidos.columns.add('id_parte', modulos.sql.Int);
    Type_recibir_pedidos.columns.add('linea', modulos.sql.Int);
    Type_recibir_pedidos.columns.add('linea_detalle_pedido', modulos.sql.Int);
    Type_recibir_pedidos.columns.add('cantidad', modulos.sql.Int);
    Type_recibir_pedidos.columns.add('numero_de_serie', modulos.sql.NVarChar);
    Type_recibir_pedidos.columns.add('descripcion', modulos.sql.NVarChar);
    Type_recibir_pedidos.columns.add('estado', modulos.sql.Char(1));
    Type_recibir_pedidos.columns.add('usurario_crea', modulos.sql.Int);
    Type_recibir_pedidos.columns.add('fecha_crea', modulos.sql.Date);
    Type_recibir_pedidos.columns.add('usuario_actualiza', modulos.sql.Int);
    Type_recibir_pedidos.columns.add('fecha_actualiza', modulos.sql.Date);
    console.log("array tamaño---->>>  ",req.body.matriz.length);
   for (var i = 0; i < req.body.matriz.length; i++) {
       //Type_DETALLE_PEDIDO.rows.add(i, 1, 1, 1, 1, 1, 1, 1, 2.57, 1.89, 1, 1, 1, 1, 1);
       Type_recibir_pedidos.rows.add(req.body.matriz[i][0]
        ,req.body.matriz[i][1]
        ,req.body.matriz[i][2]
        ,req.body.matriz[i][3]
        ,req.body.matriz[i][4]
        ,req.body.matriz[i][5]
        ,req.body.matriz[i][6]
        ,req.body.matriz[i][7]
        ,req.body.matriz[i][8]
        ,req.body.matriz[i][9]
        ,1
        ,req.body.matriz[i][11]
        ,1);//1, 1, 1, 1, 1, 1, 1, 1, 2.57, 1.89, 1, 1, 1, 1, 1);
   }
    
    console.log("tabla ", Type_recibir_pedidos);
    modulos.sql.connect(modulos.config, function (err) {
        var request = new modulos.sql.Request();
        request.input('recibir_pedidos', Type_recibir_pedidos);
        request.execute('GEN_recibir_pedidos').then(function (rows) {
            // console.log('err', err);
            // console.log('recordsets', recordsets);
            // console.log('returnValue', returnValue);
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
