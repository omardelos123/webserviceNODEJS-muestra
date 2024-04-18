var modulos = require('../../exportar');
modulos.router.post('/CRUD_licencias', (req, res) => {
    console.log('CRUD_licencias');
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
                request.input('id_licencia', modulos.sql.Int, req.body.id_licencia);
                request.input('nombre', modulos.sql.VarChar(100), req.body.nombre);
                request.input('sistemas', modulos.sql.VarChar, req.body.sistemas);
                request.input('id_compania', modulos.sql.Int, req.body.id_compania);
                request.input('descripcion', modulos.sql.VarChar(250), req.body.descripcion);
                request.input('usuario_crea', modulos.sql.Int, req.body.usuario_crea);
                request.input('usuario_actualiza', modulos.sql.Int, req.body.usuario_actualiza);
                request.input('sw_activo', modulos.sql.Int, req.body.sw_activo);
                request.input('accion_tipo', modulos.sql.Char(1), req.body.accion_tipo);
        
                request.execute('CRUD_licencias').then(function (rows) {
                    res.json(rows);
                    modulos.sql.close();
                }).catch(function (err) {
                    res.json(err);
                    console.log(err)
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