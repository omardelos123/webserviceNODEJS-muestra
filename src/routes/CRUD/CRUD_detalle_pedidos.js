var modulos = require('../../exportar');
modulos.router.post('/CRUD_detalle_pedidos', (req, res) => {
    console.log('CRUD_detalle_pedidos');
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
                request.input('id_pedido', modulos.sql.Int, req.body.id_pedido);
                request.input('linea', modulos.sql.Int, req.body.linea);
                request.input('cantidad', modulos.sql.Int, req.body.cantidad);
                request.input('id_proveedor', modulos.sql.Int, req.body.id_proveedor);
                request.input('nombre_proveedor', modulos.sql.NVarChar(150), req.body.nombre_proveedor);
                request.input('id_fabricante', modulos.sql.Int, req.body.id_fabricante);
                request.input('nombre_fabricante', modulos.sql.NVarChar(150), req.body.nombre_fabricante);
                request.input('manejo_de_envio', modulos.sql.Numeric(18, 2), req.body.manejo_de_envio);
                request.input('id_parte', modulos.sql.Int, req.body.id_parte);
                request.input('nombre_parte', modulos.sql.NVarChar(150), req.body.nombre_parte);
                request.input('id_unidad', modulos.sql.Int, req.body.id_unidad);
                request.input('nombre_unidad', modulos.sql.NVarChar(150), req.body.nombre_unidad);
                request.input('id_tarea', modulos.sql.Int, req.body.id_tarea);
                request.input('nombre_tarea', modulos.sql.NVarChar(150), req.body.nombre_tarea);
                request.input('precio_unitario', modulos.sql.Numeric(18, 2), req.body.precio_unitario);
                request.input('total', modulos.sql.Numeric(18, 2), req.body.total);
                request.input('descuento', modulos.sql.Numeric(18, 2), req.body.descuentoer);
                request.input('usuario_crea', modulos.sql.Int, req.body.usuario_crea);
                request.input('fecha_crea', modulos.sql.Date, null);
                request.input('usuario_actualiza', modulos.sql.Int, req.body.usuario_actualiza);
                request.input('fecha_actualiza', modulos.sql.Date, null);
                request.input('sw_activo', modulos.sql.Int, req.body.sw_activo);
                request.input('accion_tipo', modulos.sql.Char(1), req.body.accion_tipo);
                request.execute('CRUD_detalle_pedidos').then(function (rows) { 
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