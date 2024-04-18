var modulos = require('../../exportar');
modulos.router.post('/GEN_requisiciones_by_id_deficiencia', (req, res) => {
    console.log('GEN_requisiciones_by_id_deficiencia');
    if (!req.body.token) {
        res.status(401).send({
            error: "Es necesario el token de autenticación"
        });
        return
    } else {
        var valido = modulos._token.validar(req.body.token);
        if (valido == true) {
		
            var id_deficiencia = req.body.id_deficiencia;

            modulos.sql.connect(modulos.config, function (err) {
                var request = new modulos.sql.Request();
                let query =
                    `select A.*, B.nombre AS 'nombre_parte', C.nombre AS 'prioridad'
                    from requisiciones A
                    INNER JOIN catalogo_de_repuesto B
                        ON A.id_parte = B.id_parte
                    INNER JOIN prioridades C
                        ON C.id_prioridad = A.id_prioridad
                    WHERE A.id_deficiencia = ${id_deficiencia}`;
        
                request.query(query).then(function (row) {
                    res.json(row);
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