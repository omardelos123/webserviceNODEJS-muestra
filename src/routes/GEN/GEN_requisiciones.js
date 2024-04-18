var modulos = require('../../exportar');
modulos.router.post('/GEN_requisiciones', (req, res) => {
    console.log('GEN_requisiciones');
    if (!req.body.token) {
        res.status(401).send({
            error: "Es necesario el token de autenticación"
        });
        return
    } else {
        var valido = modulos._token.validar(req.body.token);
        if (valido == true) {
		
            var Type_requisiciones = new modulos.sql.Table();

            Type_requisiciones.columns.add('id_compania', modulos.sql.Int);
            Type_requisiciones.columns.add('id_requisicion', modulos.sql.Int);
            Type_requisiciones.columns.add('id_deficiencia', modulos.sql.Int);
            Type_requisiciones.columns.add('id_parte', modulos.sql.Int);
            Type_requisiciones.columns.add('id_prioridad', modulos.sql.Int);
            Type_requisiciones.columns.add('cantidad', modulos.sql.Int);
            Type_requisiciones.columns.add('sw_solicitada', modulos.sql.Int);
            Type_requisiciones.columns.add('usurario_crea', modulos.sql.Int);
            Type_requisiciones.columns.add('fecha_crea', modulos.sql.Date);
            Type_requisiciones.columns.add('usuario_actualiza', modulos.sql.Int);
            Type_requisiciones.columns.add('fecha_actualiza', modulos.sql.Date);
            Type_requisiciones.columns.add('sw_activo', modulos.sql.Int);
            console.log('req.body.id_deficiencia', req.body.id_deficiencia)
            for (const i in req.body.requisiciones) {
                console.log(req.body.requisiciones[i])
                Type_requisiciones.rows.add(req.body.requisiciones[i].id_compania, req.body.requisiciones[i].id_requisicion,
                                            req.body.id_deficiencia, req.body.requisiciones[i].id_parte,
                                            req.body.requisiciones[i].id_prioridad, req.body.requisiciones[i].cantidad,
                                            req.body.requisiciones[i].sw_solicitada, req.body.requisiciones[i].usurario_crea,
                                            req.body.requisiciones[i].fecha_crea, req.body.requisiciones[i].usuario_actualiza,
                                            req.body.requisiciones[i].fecha_actualiza, req.body.requisiciones[i].sw_activo
                                        );
            }
        
            modulos.sql.connect(modulos.config, function (err) {
                var request = new modulos.sql.Request();
                request.input('tbl_requisiciones', Type_requisiciones);
                request.execute('GEN_requisiciones').then(function (rows) {
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