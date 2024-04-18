var modulos = require('../../exportar');
modulos.router.post('/CRUD_prioridades', (req, res) => {
    console.log('CRUD_prioridades');
    if (!req.body.token) {
        res.status(401).send({
            error: "Es necesario el token de autenticación"
        });
        return
    } else {
        var valido = modulos._token.validar(req.body.token);
        if (valido == true) {
		    modulos.sql.connect(modulos.config, function (err) {
                //
                var request = new modulos.sql.Request();
                request.input('id_compania', modulos.sql.Int, req.body.id_compania);
                request.input('id_prioridad', modulos.sql.Int, req.body.id_prioridad);
                request.input('id_tipo_deficiencia', modulos.sql.Int, req.body.id_tipo_deficiencia);
                request.input('nombre', modulos.sql.VarChar(100), req.body.nombre);
                request.input('usuario_crea', modulos.sql.Int, req.body.usuario_crea);
                request.input('usuario_actualiza', modulos.sql.Int, req.body.usuario_actualiza);
                request.input('fecha_crea', modulos.sql.Date, req.body.fecha_crea);
                request.input('fecha_actualiza', modulos.sql.Date, req.body.fecha_actualiza);
                request.input('sw_activo', modulos.sql.Int, req.body.sw_activo);
                request.input('accion_tipo', modulos.sql.Char(1), req.body.accion_tipo);
                request.execute('CRUD_prioridades').then(function (rows) {
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