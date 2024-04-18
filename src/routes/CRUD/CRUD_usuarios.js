var modulos = require('../../exportar');
modulos.router.post('/CRUD_usuarios', (req, res) => {
    console.log('CRUD_usuarios');
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
                request.input('id_usuario', modulos.sql.Int, req.body.id_usuario);
                request.input('id_rol', modulos.sql.Int, req.body.id_rol);
                request.input('nombre', modulos.sql.VarChar(100), req.body.nombre_usuario);
                request.input('apellido', modulos.sql.VarChar(100), req.body.apellido);
                request.input('identidad_personal', modulos.sql.VarChar(100), req.body.identidad_personal);
                request.input('fecha_de_nacimiento', modulos.sql.Date, req.body.fecha_de_nacimiento);
                request.input('telefono', modulos.sql.VarChar(50), req.body.telefono);
                request.input('direccion', modulos.sql.VarChar(250), req.body.direccion);
                request.input('correo', modulos.sql.VarChar(100), req.body.correo);
                request.input('usuario', modulos.sql.VarChar(100), req.body.usuario);
                request.input('contrasena', modulos.sql.VarChar(100), req.body.contrasena);
                request.input('usuario_crea', modulos.sql.Int, req.body.usuario_crea);
                request.input('usuario_actualiza', modulos.sql.Int, req.body.usuario_actualiza);
                request.input('fecha_crea', modulos.sql.Date, null);
                request.input('fecha_actualiza', modulos.sql.Date, null);
                request.input('sw_activo', modulos.sql.Int, req.body.sw_activo);
                request.input('accion_tipo', modulos.sql.Char(1), req.body.accion_tipo);
                request.input('id_tipo_personal', modulos.sql.Int, req.body.id_tipo_personal);
                request.input('fecha_inicio', modulos.sql.Date, req.body.fecha_inicio);
                request.input('genero', modulos.sql.Char(1), req.body.genero);
                request.input('foto', modulos.sql.VarChar, req.body.foto);
                request.input('tipo_imagen', modulos.sql.VarChar(100), req.body.tipo_img);
                request.input('id_licencia', modulos.sql.Int, req.body.id_licencia);
                request.execute('CRUD_usuarios').then(function (rows) {
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