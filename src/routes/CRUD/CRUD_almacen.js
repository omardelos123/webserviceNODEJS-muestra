var modulos = require('../../exportar');
modulos.router.post('/CRUD_almacen', (req, res) => {
    console.log('CRUD_almacen');
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
                request.input('id_almacen', modulos.sql.Int, req.body.id_almacen);
                request.input('id_parte', modulos.sql.Int, req.body.id_parte);
                request.input('id_proveedor', modulos.sql.Int, req.body.id_proveedor);
                request.input('id_ubicacion', modulos.sql.Int, req.body.id_ubicacion);
               // request.input('cant_disponible', modulos.sql.Int, req.body.cant_disponible);
               // request.input('cant_autorizada', modulos.sql.Int, req.body.cant_autorizada);
             //   request.input('min_permitida', modulos.sql.Int, req.body.min_permitida);
               // request.input('precio_unitario', modulos.sql.Numeric(18, 2), req.body.precio_unitario);
                request.input('descripcion', modulos.sql.VarChar(250), req.body.descripcion);
                request.input('usuario_crea', modulos.sql.Int, req.body.usuario_crea);
                request.input('fecha_crea', modulos.sql.Date, null);
                request.input('usuario_actualiza', modulos.sql.Int, req.body.usuario_actualiza);
                request.input('fecha_actualiza', modulos.sql.Date, null);
                request.input('cod_rfid', modulos.sql.VarChar(250), req.body.cod_rfid);
                request.input('sw_rfid', modulos.sql.Int, req.body.sw_rfid);
                request.input('sw_activo', modulos.sql.Int, req.body.sw_activo);
                request.input('accion_tipo', modulos.sql.Char(1), req.body.accion_tipo);
                //request.input('id_fabricante', modulos.sql.Int, req.body.id_fabricante);
                request.execute('CRUD_almacen').then(function (rows) {
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