var modulos = require('../../exportar');
modulos.router.post('/CRUD_proveedores', (req, res) => {
    console.log('CRUD_proveedores');
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
                request.input('id_proveedor', modulos.sql.Int, req.body.id_proveedor);
                request.input('nombre', modulos.sql.VarChar(100), req.body.nombre);
                request.input('ruc', modulos.sql.VarChar(100), req.body.ruc);
                request.input('nombre_contacto', modulos.sql.VarChar(100), req.body.nombre_contacto);
                request.input('domicilio', modulos.sql.VarChar(100), req.body.domicilio);
                request.input('id_distrito', modulos.sql.Int, req.body.id_distrito);
                request.input('sw_tipo_entrega', modulos.sql.Int, req.body.sw_tipo_entrega);
                request.input('id_forma_pago', modulos.sql.Int, req.body.id_forma_pago);
                request.input('id_pais', modulos.sql.Int, req.body.id_pais);
                request.input('id_provincia', modulos.sql.Int, req.body.id_provincia);
                request.input('id_provincia', modulos.sql.Int, req.body.id_provincia);
                request.input('telefono', modulos.sql.VarChar(100), req.body.telefono);
                request.input('codigo_postal', modulos.sql.VarChar(50), req.body.codigo_postal);
                request.input('correo', modulos.sql.VarChar(100), req.body.correo);
                request.input('pagina_web', modulos.sql.VarChar(100), req.body.pagina_web);
                request.input('descripcion', modulos.sql.VarChar(250), req.body.descripcion);
                request.input('sw_tipo_entrega', modulos.sql.Int, req.body.sw_tipo_entrega);
                request.input('id_forma_pago', modulos.sql.Int, req.body.id_forma_pago); 
                request.input('manejo_de_envio', modulos.sql.Numeric(18, 2), req.body.manejo_de_envio);         
                request.input('usuario_crea', modulos.sql.Int, req.body.usuario_crea);
                request.input('fecha_crea', modulos.sql.Date, null);
                request.input('usuario_actualiza', modulos.sql.Int, req.body.usuario_actualiza);
                request.input('fecha_actualiza', modulos.sql.Date, null);
                request.input('sw_activo', modulos.sql.Int, req.body.sw_activo);
                request.input('accion_tipo', modulos.sql.Char(1), req.body.accion_tipo);
                request.execute('CRUD_proveedores').then(function (rows) {
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