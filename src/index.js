'use strict'
const app = require('./app').app;

// iniciar el servidor
app.listen(app.get('port'), () => {
    console.log('Server en puerto, ', app.get('port'));
})
