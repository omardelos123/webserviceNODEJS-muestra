var modulos = require('../../exportar');
modulos.router.post('/GEN_insert_tareas_orden_de_trabajo', (req, res) => {
    console.log('GEN_insert_tareas_orden_de_trabajo');
    if (!req.body.token) {
        res.status(401).send({
            error: "Es necesario el token de autenticación"
        });
        return
    } else {
        var valido = modulos._token.validar(req.body.token);
        if (valido == true) {
            var Type_tareas_orden_de_trabajo = new modulos.sql.Table();

            Type_tareas_orden_de_trabajo.columns.add('id_compania', modulos.sql.Int);
            Type_tareas_orden_de_trabajo.columns.add('id_orden_trabajo', modulos.sql.Int);
            Type_tareas_orden_de_trabajo.columns.add('id_tarea', modulos.sql.Int);
            Type_tareas_orden_de_trabajo.columns.add('id_deficiencia', modulos.sql.Int);
            Type_tareas_orden_de_trabajo.columns.add('descripcion', modulos.sql.VarChar);
            Type_tareas_orden_de_trabajo.columns.add('usuario_crea', modulos.sql.Int);
            Type_tareas_orden_de_trabajo.columns.add('fecha_crea', modulos.sql.Int);
            Type_tareas_orden_de_trabajo.columns.add('usuario_actualiza', modulos.sql.Int);
            Type_tareas_orden_de_trabajo.columns.add('fecha_actualiza', modulos.sql.Date);
            Type_tareas_orden_de_trabajo.columns.add('sw_activo', modulos.sql.Int);
            for (const i in req.body.tareas) {
                console.log(req.body.tareas[i])
                Type_tareas_orden_de_trabajo.rows.add(
                    req.body.tareas[i].id_compania,
                    req.body.tareas[i].id_orden_trabajo,
                    req.body.tareas[i].id_tarea,
                    req.body.tareas[i].id_deficiencia,
                    req.body.tareas[i].descripcion,
                    req.body.tareas[i].usuario_crea,
                    req.body.tareas[i].fecha_crea,
                    req.body.tareas[i].usuario_actualiza,
                    req.body.tareas[i].fecha_actualiza,
                    req.body.tareas[i].sw_activo,
                );
            }
        
            modulos.sql.connect(modulos.config, function (err) {
                var request = new modulos.sql.Request();
                request.input('tbl_tareas_orden_de_trabajo', Type_tareas_orden_de_trabajo);
                request.execute('GEN_insert_tareas_orden_de_trabajo').then(function (rows) {
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