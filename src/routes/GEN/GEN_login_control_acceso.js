var modulos = require('../../exportar');
modulos.router.post('/GEN_login_control_acceso', (req, res) => {
    console.log('GEN_login_control_acceso');
    modulos.sql.connect(modulos.config, function (err) {
        var request = new modulos.sql.Request();
        request.input('usuario', modulos.sql.VarChar(100), req.body.usuario);
        request.input('contrasena', modulos.sql.VarChar(100), req.body.contrasena);
        request.execute('GEN_login_control_acceso').then(function (rows) {
            console.log(rows);
            modulos.sql.close();
            var acceso = rows.recordsets[0][0].ACCESO;
            if (acceso == 1) {
                rows.token = modulos._token.generar(rows.recordsets[0][0]);
            }else{
                rows.token = '';
            }
            res.json(rows);
        }).catch(function (err) {
            res.json(err);
            modulos.sql.close();
        });
    });

});

module.exports = modulos.router;