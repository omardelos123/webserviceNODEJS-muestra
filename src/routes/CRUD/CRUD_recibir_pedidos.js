var modulos = require('../../exportar');
modulos.router.post('/CRUD_recibir_pedidos', (req, res) => {
    console.log('CRUD_recibir_pedidos');
    if (!req.body.token) {
        res.status(401).send({
            error: "Es necesario el token de autenticación"
        });
        return
    } else {
        var valido = modulos._token.validar(req.body.token);
        if (valido == true) {
		    modulos.sql.connect(modulos.config, function (err) {
                //request.input('nombre', modulos.sql.VarChar(100), req.body.nombre);
                var request = new modulos.sql.Request();
                request.input('id_compania', modulos.sql.Int, req.body.id_compania);
                request.input('id_pedido', modulos.sql.Int, req.body.id_pedido);
                request.input('id_parte', modulos.sql.Int, req.body.id_parte);
                request.input('linea', modulos.sql.Int, req.body.linea);
                request.input('linea_detalle_pedido', modulos.sql.Int, req.body.linea_detalle_pedido);
                request.input('cantidad', modulos.sql.Int, req.body.cantidad);
                request.input('numero_de_serie', modulos.sql.VarChar(50), req.body.numero_de_serie);
                request.input('descripcion', modulos.sql.VarChar(250), req.body.descripcion);
                request.input('estado', modulos.sql.Char(1), req.body.estado);
                request.input('sw_estado_pedido', modulos.sql.Int, req.body.sw_estado_pedido);
                request.input('usuario_crea', modulos.sql.Int, req.body.usuario_crea);
                request.input('fecha_crea', modulos.sql.Date, null);
                request.input('usuario_actualiza', modulos.sql.Int, req.body.usuario_actualiza);
                request.input('fecha_actualiza', modulos.sql.Date, null);
                request.input('accion_tipo', modulos.sql.Char(1), req.body.accion_tipo);
                request.execute('CRUD_recibir_pedidos').then(function (rows) {
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