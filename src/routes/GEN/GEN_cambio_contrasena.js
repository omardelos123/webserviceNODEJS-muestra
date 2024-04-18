var modulos = require('../../exportar');
modulos.router.post('/GEN_cambio_contrasena', (req, res) => {
    console.log('GEN_cambio_contrasena');
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
                request.input('id_usuario', modulos.sql.Int, req.body.id_usuario);
                request.input('contrasena', modulos.sql.VarChar(100), req.body.contrasena);
                request.input('usuario_actualiza', modulos.sql.Int, req.body.usuario_actualiza);
                request.input('accion_tipo', modulos.sql.Char(1), req.body.accion_tipo);
                request.execute('GEN_cambio_contrasena').then(function (rows) {
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