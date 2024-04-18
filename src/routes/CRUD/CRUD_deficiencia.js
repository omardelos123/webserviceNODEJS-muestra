var modulos = require('../../exportar');
modulos.router.post('/CRUD_deficiencias', (req, res) => {
    console.log('CRUD_deficiencias');
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
                request.input('id_deficiencia', modulos.sql.Int, req.body.id_deficiencia);
                request.input('id_compania', modulos.sql.Int, req.body.id_compania);
                request.input('id_tipo_deficiencia', modulos.sql.Int, req.body.id_tipo_deficiencia);
                request.input('id_tipo_mantenimiento', modulos.sql.Int, req.body.id_tipo_mantenimiento);
                request.input('id_estatus', modulos.sql.Int, req.body.id_estatus);
                request.input('fecha_deficiencia', modulos.sql.Date, req.body.fecha_deficiencia);
                request.input('usuario_crea', modulos.sql.Int, req.body.usuario_crea);
                request.input('usuario_actualiza', modulos.sql.Int, req.body.usuario_actualiza);
                request.input('fecha_crea', modulos.sql.Date, null);
                request.input('fecha_actualiza', modulos.sql.Date, null);
                request.input('accion_tipo', modulos.sql.Char(1), req.body.accion_tipo);
                request.input('id_sistema', modulos.sql.Int, req.body.id_sistema);
                request.input('descripcion', modulos.sql.VarChar(150), req.body.descripcion);
                request.input('id_posible_falla', modulos.sql.Int, req.body.id_posible_falla);
                request.execute('CRUD_deficiencias').then(function (rows) {
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