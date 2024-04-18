
// requerimos el paquete del nodemailer
var nodemailer = require('nodemailer');

var modulos = require('../../exportar');
modulos.router.post('/envioCorreo', (req, res) => {
    console.log('envioCorreo');
    // if (!req.body.token) {
    //     res.status(401).send({
    //         error: "Es necesario el token de autenticación"
    //     });
    //     return
    // } else {
    //     var valido = modulos._token.validar(req.body.token);
    //     if (valido == true) {
            //#region envio de correo electronico

            // creamos el objeto de transporte
            var transporte = nodemailer.createTransport({
                host: 'smtp.gmail.com',
                port: 587,
                secure: false,
                requireTLS: true,
                auth: {
                    user: 'eliasmdominguez@gmail.com',
                    pass: '--'
                }
            });

            // Crear El Objeto de Opciones Con La Información Correspondiente 
            var mailOptions = {
                from: 'eliasmdominguez@gmail.com',
                to: 'eliasmdominguez@gmail.com,javierbellido16@hotmail.com,omardelosrios778@gmail.com',
                subject: 'Pruebas desde el SILC-im',
                text: '',
                html: '<h1>Click !!!</h1>'
            }

            // Enviar El Correo
            transporte.sendMail(mailOptions, function (err, info) {
                if (err) {
                    console.log(err);
                } else {
                    console.log('Enviado: ', info);
                }
            })

            /*
            Allow less secure apps to access account.
            
            
            Activar en la cuenta gmail: 
                                        Acceso de aplicaciones poco seguras
            https://myaccount.google.com/lesssecureapps?pli=1
            */
            //#endregion
        // } else {
        //     res.status(401).send({
        //         error: 'Token inválido'
        //     });
        // }
    // }
});

module.exports = modulos.router;