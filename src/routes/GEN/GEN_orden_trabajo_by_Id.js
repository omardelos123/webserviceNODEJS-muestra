var modulos = require('../../exportar');
modulos.router.post('/GEN_orden_trabajo_by_Id', (req, res) => {
    console.log('GEN_orden_trabajo_by_Id');
    if (!req.body.token) {
        res.status(401).send({
            error: "Es necesario el token de autenticación"
        });
        return
    } else {
        var valido = modulos._token.validar(req.body.token);
        if (valido == true) {
            var id_orden_trabajo = req.body.id_orden;
            
            modulos.sql.connect(modulos.config, function (err) {
                var request = new modulos.sql.Request();
                let query = 
                `SELECT B.*, C.nombre AS 'posible_falla', D.nombre AS 'posible_falla', A.procesada FROM tareas_orden_de_trabajo A
                INNER JOIN deficiencias B
                    ON A.id_deficiencia = B.id_deficiencia
                INNER JOIN posibles_fallas C
                    ON B.id_posible_falla = C.id_posible_falla
                INNER JOIN tipo_de_deficiencia D
                    ON B.id_tipo_deficiencia = D.id_tipo_deficiencia
                WHERE A.id_orden_trabajo = ${id_orden_trabajo}`;
        
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