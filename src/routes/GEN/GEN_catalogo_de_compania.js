var modulos = require('../../exportar');
modulos.router.post('/GEN_catalogo_de_compania', (req, res) => {
    console.log('GEN_catalogo_de_compania');
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
                request.input('accion_tipo', modulos.sql.Char(1), req.body.accion_tipo);
                request.input('id_deficiencia', modulos.sql.Int, req.body.id_deficiencia);
                request.execute('GEN_catalogo_de_compania').then(function (rows) {
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