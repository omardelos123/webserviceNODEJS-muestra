var modulos = require('../../exportar');
modulos.router.post('/CRUD_sistemas', (req, res) => {
    console.log('CRUD_sistemas');
    if (!req.body.token) {
        res.status(401).send({
            error: "Es necesario el token de autenticación"
        });
        return
    } else {
        var valido = modulos._token.validar(req.body.token);
        if (valido == true) {
		modulos.sql.connect(modulos.config, function (err) {
            var request = new modulos.sql.Request();
            request.input('id_compania', modulos.sql.Int, req.body.id_compania);
            request.input('id_sistema', modulos.sql.Int, req.body.id_sistema);
            request.input('id_fabricante', modulos.sql.Int, req.body.id_fabricante);
            request.input('id_clase', modulos.sql.Int, req.body.id_clase);
            request.input('id_modelo', modulos.sql.Int, req.body.id_modelo);
            request.input('id_tipo_sistema', modulos.sql.Int, req.body.id_tipo_sistema);
            request.input('id_padre', modulos.sql.Int, req.body.id_padre);
            request.input('nombre', modulos.sql.VarChar(100), req.body.nombre);
            request.input('descripcion', modulos.sql.VarChar(250), req.body.descripcion);
            request.input('numero_serie', modulos.sql.VarChar(150), req.body.numero_serie);
            request.input('numero_placa', modulos.sql.VarChar(100), req.body.numero_placa);
            request.input('ano_fabricacion', modulos.sql.Date, req.body.ano_fabricacion);
            request.input('valor', modulos.sql.Int, req.body.valor);
            request.input('sw_despachable', modulos.sql.Int, req.body.sw_despachable);
            request.input('id_destino', modulos.sql.Int, req.body.id_destino);
            request.input('sw_garantia', modulos.sql.Int, req.body.sw_garantia);
            request.input('fecha_expiracion', modulos.sql.Date, req.body.fecha_expiracion);
            request.input('lectura', modulos.sql.Char(1), req.body.lectura);
            request.input('uso_util', modulos.sql.Int, req.body.uso_util);
            request.input('id_tipo_combustible', modulos.sql.Int, req.body.id_tipo_combustible);
            request.input('id_operador_principal', modulos.sql.Int, req.body.id_operador_principal);
            request.input('id_supervisor_responsable', modulos.sql.Int, req.body.id_supervisor_responsable);
            request.input('estatus', modulos.sql.Int, req.body.estatus);
            request.input('usuario_crea', modulos.sql.Int, req.body.usuario_crea);
            request.input('fecha_crea', modulos.sql.Date, req.body.fecha_crea);
            request.input('usuario_actualiza', modulos.sql.Int, req.body.usuario_actualiza);
            request.input('fecha_actualiza', modulos.sql.Date, req.body.fecha_actualiza);
            request.input('sw_activo', modulos.sql.Int, req.body.sw_activo);
            request.input('valor_lectura', modulos.sql.Numeric(18, 2), req.body.valor_lectura);
            request.input('accion_tipo', modulos.sql.Char(1), req.body.accion_tipo);
            request.execute('CRUD_sistemas').then(function (rows) {
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