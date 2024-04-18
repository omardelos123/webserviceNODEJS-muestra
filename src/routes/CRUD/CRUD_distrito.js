var modulos = require('../../exportar');
modulos.router.post('/CRUD_distrito', (req, res) => {
    console.log('CRUD_distrito');
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
                request.input('id_distrito', modulos.sql.Int, req.body.id_distrito);
                request.input('id_provincia', modulos.sql.Int, req.body.id_provincia);
                request.input('id_pais', modulos.sql.Int, req.body.id_pais);
                request.input('nombre', modulos.sql.VarChar(100), req.body.nombre);
                request.input('longitud', modulos.sql.VarChar(100), req.body.longitud);
                request.input('latitud',modulos.sql.VarChar(100), req.body.latitud);
                request.input('usuario_crea', modulos.sql.Int, req.body.usuario_crea);
                request.input('fecha_crea', modulos.sql.Date, null);
                request.input('usuario_actualiza', modulos.sql.Int, req.body.usuario_actualiza);
                request.input('fecha_actualiza', modulos.sql.Date, null);
                request.input('sw_activo', modulos.sql.Int, req.body.sw_activo);
                request.input('accion_tipo', modulos.sql.Char(1), req.body.accion_tipo);
                request.execute('CRUD_distrito').then(function (rows) {
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