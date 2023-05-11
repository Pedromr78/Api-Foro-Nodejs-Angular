'use strict'

//Para crear rutas
var express = require('express');
//Controlador
var CommentController= require('../controllers/comment');

//middleware    
var md_auth= require('../middlewares/authenticated');
//Librearias
var multipart= require('connect-multiparty');
var md_upload=multipart({   uploadDir: './uploads/users'})

var router= express.Router();



//Rutas de topic
router.post('/comment/:topicId', md_auth.authenticated,CommentController.add);
router.put('/comment/:commentId', md_auth.authenticated,CommentController.update);
router.delete('/comment/:topicId/:commentId', md_auth.authenticated,CommentController.delete);

module.exports= router;