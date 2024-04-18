var modulos = require('../../exportar');
modulos.router.post('/GEN_eliminar_recibir_pedido', (req, res) => {
    console.log('GEN_eliminar_recibir_pedido');
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
                request.input('id_pedido', modulos.sql.Int, req.body.id_pedido);
                request.input('id_compania', modulos.sql.Int, req.body.id_compania);
                request.input('id_parte', modulos.sql.Int, req.body.id_parte);
                request.input('linea_detalle_pedido', modulos.sql.Int, req.body.linea_detalle_pedido);
                request.execute('GEN_eliminar_recibir_pedido').then(function (rows) {
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