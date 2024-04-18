var modulos = require('../../exportar');
modulos.router.post('/REP_inventario', (req, res) => {
    console.log('REP_inventario');
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
                request.input('id_almacen_compania', modulos.sql.Int, req.body.id_almacen_compania);
                request.input('id_parte', modulos.sql.Int, req.body.id_parte);
                // request.input('id_proveedor', modulos.sql.Int, req.body.id_proveedor);
                request.execute('REP_inventario').then(function (rows) {
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