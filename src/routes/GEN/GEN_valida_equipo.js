var modulos = require('../../exportar');
modulos.router.post('/GEN_valida_equipo', (req, res) => {
    console.log('GEN_valida_equipo');
    if (!req.body.token) {
        res.status(401).send({
            error: "Es necesario el token de autenticación"
        });
        return
    } else {
        var valido = modulos._token.validar(req.body.token);
        if (valido == true) {
            var nombre = req.body.nombre;
            modulos.sql.connect(modulos.config, function (err) {
                var request = new modulos.sql.Request();
                let query = `SELECT COUNT(*) AS 'existe' FROM clase_de_equipo WHERE nombre = '${nombre}'`;
        
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