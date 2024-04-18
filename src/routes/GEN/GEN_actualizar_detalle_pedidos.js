var modulos = require('../../exportar');
modulos.router.post('/GEN_actualizar_detalle_pedidos', (req, res) => {
    console.log('GEN_actualizar_detalle_pedidos')
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
                request.input('id_parte', modulos.sql.Int, req.body.id_parte);
                request.input('id_pedido', modulos.sql.Int, req.body.id_pedido);
                request.input('linea', modulos.sql.Int, req.body.linea);
                request.input('faltante', modulos.sql.Int, req.body.faltante);
                request.input('estatus',  modulos.sql.VarChar(50), req.body.estatus);
                request.execute('GEN_actualizar_detalle_pedidos').then(function (rows) {
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