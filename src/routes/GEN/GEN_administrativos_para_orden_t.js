var modulos = require('../../exportar');
modulos.router.post('/GEN_administrativos_para_orden_t', (req, res) => {
    console.log('GEN_administrativos_para_orden_t');
    if (!req.body.token) {
        res.status(401).send({
            error: "Es necesario el token de autenticación"
        });
        return
    } else {
        var valido = modulos._token.validar(req.body.token);
        if (valido == true) {
            var id_sistema = req.body.id_sistema;
            console.log(id_sistema)
            
            modulos.sql.connect(modulos.config, function (err) {
                var request = new modulos.sql.Request();
                let query = `SELECT A.*, B.nombre AS 'nombre_sistema', 'TRC_001' AS numero_administrativo, C.*, D.nombre AS 'nombre_parte', E.nombre 'posible_falla'
                                FROM deficiencias A
                                INNER JOIN sistemas B
                                    ON A.id_sistema = B.id_sistema
                                INNER JOIN requisiciones C
                                    ON A.id_deficiencia = C.id_deficiencia
                                INNER JOIN catalogo_de_compania D
                                    ON C.id_parte = D.id_parte_compania
                                INNER JOIN posibles_fallas E
                                    ON A.id_posible_falla = E.id_posible_falla
                                WHERE A.id_sistema = ${id_sistema}
                                `;
        
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