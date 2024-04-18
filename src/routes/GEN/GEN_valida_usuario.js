var modulos = require('../../exportar');
modulos.router.post('/GEN_valida_usuario', (req, res) => {
    console.log('GEN_valida_usuario');
    if (!req.body.token) {
        res.status(401).send({
            error: "Es necesario el token de autenticación"
        });
        return
    } else {
        var valido = modulos._token.validar(req.body.token);
        if (valido == true) {
            var usuario = req.body.usuario;
            modulos.sql.connect(modulos.config, function (err) {
                var request = new modulos.sql.Request();
                let query = `SELECT count(*) AS 'existe' FROM usuarios WHERE usuario = '${usuario}'`;
        
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