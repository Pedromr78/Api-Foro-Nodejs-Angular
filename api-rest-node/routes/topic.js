'use strict'

//Para crear rutas
var express = require('express');
//Controlador
var TopicController= require('../controllers/topic');

//middleware    
var md_auth= require('../middlewares/authenticated');
//Librearias
var multipart= require('connect-multiparty');
var md_upload=multipart({   uploadDir: './uploads/users'})

var router= express.Router();



//Rutas de topic
router.post('/topic', md_auth.authenticated,TopicController.save);
router.get('/topics/:page?', TopicController.getTopics);
router.get('/user-topics/:user', TopicController.getTopicsByUser);
router.get('/topic/:id', TopicController.getTopic);
router.put('/topic/:id', md_auth.authenticated,TopicController.update);
router.delete('/topic/:id', md_auth.authenticated,TopicController.delete);
router.get('/search/:search',TopicController.search);

module.exports= router;