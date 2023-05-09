'use strict'

var express = require('express');
var UserController= require('../controllers/user');
var md_auth= require('../middlewares/authenticated');

var multipart= require('connect-multiparty');
var md_upload=multipart({   uploadDir: './uploads/users'})

var router= express.Router();



//Rutas de usurios
router.post('/register', UserController.save);
router.post('/login', UserController.login);
router.post('/upload/:id',UserController.uploadAvatar);
router.put('/update',md_auth.authenticated,UserController.update);

module.exports= router;