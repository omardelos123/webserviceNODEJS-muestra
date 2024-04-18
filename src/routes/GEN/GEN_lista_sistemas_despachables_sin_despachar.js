var modulos = require('../../exportar');
modulos.router.post('/GEN_lista_sistemas_despachables_sin_despachar', (req, res) => {
    console.log('GEN_lista_sistemas_despachables_sin_despachar');
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
                request.execute('GEN_lista_sistemas_despachables_sin_despachar').then(function (rows) {
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