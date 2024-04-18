var jwt = require('jsonwebtoken');
const key = '#/D!$!2019$!Lc-!m//&pwF|';
module.exports = {
    generar: function (datos) {
        var tokenData = {
            nombre: datos.nombre + ' ' + datos.apellido,
            nombre_compania: datos.nombre_compania
        }
        var token = jwt.sign(tokenData, key, {
            expiresIn: 60 * 60 * 24 // expires in 24 hours
        });
        return token;
    },

    validar: function (token) {
        var respuesta = false;
        token = token.replace('Bearer', '');
        jwt.verify(token, key, function (err, user) {
            if (err) {
                respuesta = false;
            } else {
                respuesta = true;
            }
        });
        return respuesta;
    }
};