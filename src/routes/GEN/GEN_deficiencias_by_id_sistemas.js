var modulos = require('../../exportar');
modulos.router.post('/GEN_deficiencias_by_id_sistemas', (req, res) => {
    console.log('GEN_deficiencias_by_id_sistemas');
    if (!req.body.token) {
        res.status(401).send({
            error: "Es necesario el token de autenticación"
        });
        return
    } else {
        var valido = modulos._token.validar(req.body.token);
        if (valido == true) {
            var id_sistema = req.body.id_sistema;
            modulos.sql.connect(modulos.config, function (err) {
                var request = new modulos.sql.Request();
                let query = 
                `select A.*, B.nombre AS 'posible_falla' from deficiencias A
                inner join posibles_fallas B
                    ON A.id_posible_falla = B.id_posible_falla
                where A.id_estatus = 4 AND A.id_sistema = ${id_sistema}`;
        
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