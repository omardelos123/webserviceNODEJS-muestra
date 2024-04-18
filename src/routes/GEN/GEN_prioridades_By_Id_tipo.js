var modulos = require('../../exportar');
modulos.router.post('/GEN_prioridades_By_Id_tipo', (req, res) => {
    console.log('GEN_prioridades_By_Id_tipo');
    if (!req.body.token) {
        res.status(401).send({
            error: "Es necesario el token de autenticación"
        });
        return
    } else {
        var valido = modulos._token.validar(req.body.token);
        if (valido == true) {
		
            var id_tipo_deficiencia = req.body.id_tipo_deficiencia;
            var id_compania = req.body.id_compania;
            
            modulos.sql.connect(modulos.config, function (err) {
                //request.input('nombre', modulos.sql.VarChar(100), req.body.nombre);
                var request = new modulos.sql.Request();
                let query = `select * from prioridades where id_tipo_deficiencia = ${id_tipo_deficiencia} AND id_compania = ${id_compania}`;
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