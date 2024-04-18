var modulos = require('../../exportar');
modulos.router.post('/CRUD_pedidos', (req, res) => {
    console.log('CRUD_pedidos');
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
                request.input('id_proveedor', modulos.sql.Int, req.body.id_proveedor);
                request.input('id_estatus', modulos.sql.Int, req.body.id_estatus);
                request.input('nombre_estatus', modulos.sql.VarChar(50), req.body.nombre_estatus);
                request.input('fecha_pedido', modulos.sql.Date, req.body.fecha_pedido);
                request.input('sub_total', modulos.sql.Numeric(18, 2), req.body.sub_total);
                request.input('manejo_envio', modulos.sql.Numeric(18, 2), req.body.manejo_envio);
                request.input('descuento', modulos.sql.Numeric(18, 2), req.body.descuento);
                request.input('itbms', modulos.sql.Numeric(18, 2), req.body.itbms);
                request.input('gran_total', modulos.sql.Numeric(18, 2), req.body.gran_total);
                request.input('sw_estado', modulos.sql.Int, req.body.sw_estado);
                request.input('usuario_crea', modulos.sql.Int, req.body.usuario_crea);
                request.input('fecha_crea', modulos.sql.Date, null);
                request.input('usuario_actualiza', modulos.sql.Int, req.body.usuario_actualiza);
                request.input('fecha_actualiza', modulos.sql.Date, null);
                request.input('sw_activo', modulos.sql.Int, req.body.sw_activo);
                request.input('accion_tipo', modulos.sql.Char(1), req.body.accion_tipo);
                request.execute('CRUD_pedidos').then(function (rows) {
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