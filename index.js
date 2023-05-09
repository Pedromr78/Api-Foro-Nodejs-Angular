'use sstrict'

var mongoose = require('mongoose');
var app = require('./app');
var port= process.env.Port || 3999;

mongoose.Promise = global.Promise;

mongoose.connect('mongodb://127.0.0.1:27017/forum', { useNewUrlParser: true ,  useFindAndModify: false, useUnifiedTopology: true})
    .then(() => {
        console.log('La conexion a la base de datos de mongodb se ha completado')
    //crear servidor
    app.listen(port, ()=>{
        console.log('El servidor http://localhost:3999 esta funcionando');
    })
    })
    .catch(error => console.log(error));