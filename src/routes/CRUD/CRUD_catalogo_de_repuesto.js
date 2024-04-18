var modulos = require('../../exportar');
modulos.router.post('/CRUD_catalogo_de_repuesto', (req, res) => {
    console.log('CRUD_catalogo_de_repuesto');
    if (!req.body.token) {
        res.status(401).send({
            error: "Es necesario el token de autenticación"
        });
        return
    } else {
        var valido = modulos._token.validar(req.body.token);
        if (valido == true) {
		    modulos.sql.connect(modulos.config, function (err) {
                //request.input('nombre', modulos.sql.VarChar(100), req.body.nombre);
                var request = new modulos.sql.Request();
                request.input('id_compania', modulos.sql.Int, req.body.id_compania);
                request.input('id_parte', modulos.sql.Int, req.body.id_parte);
                request.input('id_proveedor', modulos.sql.Int, req.body.id_proveedor);
                request.input('nombre', modulos.sql.VarChar(100), req.body.nombre);
                request.input('descripcion', modulos.sql.VarChar(250), req.body.descripcion);
                request.input('cant_disponible', modulos.sql.Int, req.body.cant_disponible);
                request.input('cant_autorizada', modulos.sql.Int, req.body.cant_autorizada);
                request.input('min_permitida', modulos.sql.Int, req.body.min_permitida);
                request.input('precio_unitario_base', modulos.sql.Numeric(18, 2), req.body.precio_unitario_base);
                request.input('unidad_entrega', modulos.sql.Int, req.body.id_unidad_entrega);
                request.input('unidad_proveedores', modulos.sql.Int, req.body.id_unidad_proveedor);       
                request.input('sw_reparable', modulos.sql.Int, req.body.sw_reparable);
                request.input('sw_esencial', modulos.sql.Int, req.body.sw_esencial);
                request.input('usuario_crea', modulos.sql.Int, req.body.usuario_crea);
                request.input('fecha_crea', modulos.sql.Date, null);
                request.input('usuario_actualiza', modulos.sql.Int, req.body.usuario_actualiza);
                request.input('fecha_actualiza', modulos.sql.Date, null);
                request.input('sw_activo', modulos.sql.Int, req.body.sw_activo);
                request.input('accion_tipo', modulos.sql.Char(1), req.body.accion_tipo);
                request.input('id_fabricante', modulos.sql.Int, req.body.id_fabricante);
                request.execute('CRUD_catalogo_de_repuesto').then(function (rows) {
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