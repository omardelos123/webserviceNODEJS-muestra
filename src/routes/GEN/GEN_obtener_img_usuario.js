var modulos = require('../../exportar');
modulos.router.post('/GEN_obtener_img_usuario', (req, res) => {
    console.log('GEN_obtener_img_usuario');
    if (!req.body.token) {
        res.status(401).send({
            error: "Es necesario el token de autenticación"
        });
        return
    } else {
        var valido = modulos._token.validar(req.body.token);
        if (valido == true) {
            var id_usuario = req.body.id_usuario;
            modulos.sql.connect(modulos.config, function (err) {
                var request = new modulos.sql.Request();
                let query = 
                `SELECT foto, tipo_img FROM usuarios WHERE id_usuario = ${id_usuario}`;
                request.query(query).then(function(row){
                    res.json(row);
                    modulos.sql.close();
                }).catch(function(err){
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