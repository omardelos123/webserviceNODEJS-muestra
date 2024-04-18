var modulos = require('../../exportar');
modulos.router.post('/GEN_DASHBOARD_PEDIDOS', (req, res) => {
    console.log('GEN_DASHBOARD_PEDIDOS');
    if (!req.body.token) {
        res.status(401).send({
            error: "Es necesario el token de autenticación"
        });
        return
    } else {
        var valido = modulos._token.validar(req.body.token);
        if (valido == true) {
		    modulos.sql.connect(modulos.config, function (err) {
                //request.input('nombre', modulos.sql.VarChar(100), req.body.nombre);
                var request = new modulos.sql.Request();
                request.input('id_compania', modulos.sql.Int, req.body.id_compania);
                request.input('fecha_desde', modulos.sql.Date, req.body.fecha_desde);
                request.input('fecha_hasta', modulos.sql.Date, req.body.fecha_hasta);
                request.input('id_proveedor', modulos.sql.Int, req.body.id_proveedor);
                request.execute('GEN_DASHBOARD_PEDIDOS').then(function (rows) {
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