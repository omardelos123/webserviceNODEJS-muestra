var modulos = require('../../exportar');
modulos.router.post('/CRUD_orden_de_trabajo', (req, res) => {
    console.log('CRUD_orden_de_trabajo');
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
                request.input('id_orden', modulos.sql.Int, req.body.id_orden);
                request.input('id_estatus', modulos.sql.Int, req.body.id_estatus);
                request.input('id_compania', modulos.sql.Int, req.body.id_compania);
                request.input('descripcion', modulos.sql.VarChar(250), req.body.descripcion);
                request.input('fecha_inicio_orden', modulos.sql.Date, '2019-04-04');
                request.input('sw_procesada', modulos.sql.Int, req.body.sw_procesada);
                request.input('usuario_crea', modulos.sql.Int, req.body.usuario_crea);
                request.input('usuario_actualiza', modulos.sql.Int, req.body.usuario_actualiza);
                request.input('fecha_crea', modulos.sql.Date, 1);
                request.input('fecha_actualiza', modulos.sql.Date, 1);
                request.input('sw_activo', modulos.sql.Int, req.body.sw_activo);
                request.input('accion_tipo', modulos.sql.Char(1), req.body.accion_tipo);
                request.input('id_sisetma', modulos.sql.Int, req.body.id_sistema);
                request.execute('CRUD_orden_de_trabajo').then(function (rows) {
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