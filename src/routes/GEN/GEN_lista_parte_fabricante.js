var modulos = require('../../exportar');
modulos.router.post('/GEN_lista_parte_fabricante', (req, res) => {
    console.log('GEN_lista_parte_fabricante');
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
                request.input('id_fabricante', modulos.sql.Int, req.body.id_fabricante);
                request.execute('GEN_lista_parte_fabricante').then(function (rows) {
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