var modulos = require('../../exportar');
modulos.router.post('/PROC_dashboard', (req, res) => {
    console.log('PROC_dashboard');
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
                request.input('fecha_desde', modulos.sql.Date, req.body.fecha_desde);
                request.input('fecha_hasta', modulos.sql.Date, req.body.fecha_hasta);
                request.execute('PROC_dashboard').then(function (rows) {
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