var modulos = require('../../exportar');
modulos.router.post('/CRUD_historico_pedidos', (req, res) => {
    console.log('CRUD_historico_pedidos');
    if (!req.body.token) {
        res.status(401).send({
            error: "Es necesario el token de autenticación"
        });
        return
    } else {
        var valido = modulos._token.validar(req.body.token);
        if (valido == true) {
		    modulos.sql.connect(modulos.config, function (err) {
                var request = new modulos.sql.Request();
                request.input('id_compania', modulos.sql.Int, req.body.id_compania);
                request.input('id_historico', modulos.sql.Int, req.body.id_historico);
                request.input('id_pedido', modulos.sql.Int, req.body.id_pedido);
                request.input('id_parte', modulos.sql.Int, req.body.id_parte);
                request.input('sw_recibida', modulos.sql.Int, req.body.sw_recibida);
                request.input('entrada', modulos.sql.Int, req.body.entrada);
                request.input('salida', modulos.sql.Int, req.body.salida);
                request.input('precio',modulos.sql.Numeric(18, 2), req.body.precio);
                request.input('fila', modulos.sql.Int, req.body.fila);
                request.input('historico_cant_disponible', modulos.sql.Int, req.body.historico_cant_disponible);
                request.input('usuario_crea', modulos.sql.Int, req.body.usuario_crea);
                request.input('fecha_crea', modulos.sql.Date, null);
                request.input('usuario_actualiza', modulos.sql.Int, req.body.usuario_actualiza);
                request.input('fecha_actualiza', modulos.sql.Date, null);
                request.input('sw_activo', modulos.sql.Int, req.body.sw_activo);
                request.input('accion_tipo', modulos.sql.Char(1), req.body.accion_tipo);
                request.execute('CRUD_historico_pedidos').then(function (rows) { 
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