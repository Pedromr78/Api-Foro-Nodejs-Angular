'user strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

//para crear el json y dividirlo por esquemas(usuarios)
var UserSchema = Schema({
    name: String,
    surname: String,
    email: String,
    password: String,
    image: String,
    role: String
});
//como crear el modelo y la tabla pero en mongodb
//enlazar la "tabla" con el modelo
module.exports = mongoose.model('User', UserSchema);



