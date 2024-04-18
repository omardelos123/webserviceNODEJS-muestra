var modulos = require('../../exportar');
modulos.router.post('/CRUD_despachos', (req, res) => {
    console.log('CRUD_despachos');
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
                request.input('id_despacho', modulos.sql.Int, req.body.id_despacho);
                request.input('id_compania', modulos.sql.Int, req.body.id_compania);
                request.input('id_destino', modulos.sql.Int, req.body.id_destino);
                request.input('id_sistema', modulos.sql.Int, req.body.id_sistema);
                request.input('lectura', modulos.sql.VarChar(100), req.body.lectura);
                request.input('id_operador_principal', modulos.sql.Int, req.body.id_operador_principal);
                request.input('id_operador_secundario', modulos.sql.Int, req.body.id_operador_secundario);
                request.input('fecha_hora_salida', modulos.sql.Date, req.body.fecha_hora_salida);
                request.input('fecha_hora_retorno', modulos.sql.Date, req.body.fecha_hora_retorno);
                request.input('observaciones', modulos.sql.VarChar(250), req.body.observaciones);
                request.input('despachador', modulos.sql.Int, req.body.despachador);      
                request.input('usuario_crea', modulos.sql.Int, req.body.usuario_crea);
                request.input('usuario_actualiza', modulos.sql.Int, req.body.usuario_actualiza);
                request.input('fecha_crea', modulos.sql.Date, req.body.fecha_crea);
                request.input('fecha_actualiza', modulos.sql.Date, req.body.fecha_actualiza);
                request.input('sw_activo', modulos.sql.Int, req.body.sw_activo);
                request.input('sw_impreso', modulos.sql.Int, req.body.sw_impreso);
                request.input('accion_tipo', modulos.sql.Char(1), req.body.accion_tipo);
                request.input('valor_lectura', modulos.sql.Int, req.body.valor_lectura);
                request.input('valor_lectura_retorno', modulos.sql.Int, req.body.valor_lectura_retorno);
                request.input('sw_retorno', modulos.sql.Int, req.body.sw_retorno);
                request.input('distancia_recorrida', modulos.sql.Int, req.body.distancia_recorrida);
                console.log('distancia_recorrida: ' + req.body.distancia_recorrida);
                console.log('accion_tipo: ' + req.body.accion_tipo);
                request.execute('CRUD_despachos').then(function (rows) {
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