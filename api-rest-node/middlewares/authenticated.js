'use strict'
var jwt= require('jwt-simple');
var moment= require('moment');
var secret='clave-secreta-para-generar-el-tocken-99999';


exports.authenticated= function (req, res, next) {
        if(!req.headers.authorization){
            return res.status(403).send({
                message: 'La peticion no tiene la cabecera'
            })
        }
        //Limpiar el tocken de comillas
        var tocken = req.headers.authorization.replace(/['"]+/g,'');
        try{
            //decodificar tocken
            var payload=jwt.decode(tocken, secret);
            //Comprobar si el tocken he expirado    
            if(payload.ex <= moment().unix()){
                return res.status(404).send({
                    message: 'El tocken ha expirado'
                })
            }
        }catch(ex){
            return res.status(404).send({
                message: 'El tocken no es valido'
            })
        }
        //Adjuntar usuario identificado a request
        req.user=payload;
        //Pasar la accion
        next();
}