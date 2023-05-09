'use strict'

//requires
var express = require('express');
var bodyParser = require('body-parser');

//Ejecutar express
var app= express();


//Cargar archivos de rutas
var user_routes= require('./routes/user');


//Middleware
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

//Reescribir rutas

app.use('/api',user_routes);


//Exportar modulos
module.exports = app;