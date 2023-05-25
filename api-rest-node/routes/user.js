'use strict'

//Para crear rutas
var express = require('express');

var UserController= require('../controllers/user');
var md_auth= require('../middlewares/authenticated');

//var multipart= require('connect-multiparty');
//var md_upload=multipart({   uploadDir: './uploads/users'})

const multer =require('multer');
const storage= multer.diskStorage({
    destination: function(req,file,cb){
    cb(null, './uploads/users/');
    
    },
        filename: function(req,file,cb){
            cb(null, 'user'+ Date.now() + file.originalname);
        }
    
})

const upload = multer({storage:storage});

var router= express.Router();



//Rutas de usurios
router.post('/register', UserController.save);
router.post('/login', UserController.login);
router.post('/upload',[md_auth.authenticated , upload.single('file0')],UserController.uploadAvatar);
router.put('/update',md_auth.authenticated,UserController.update);
router.get('/avatar/:fileName',UserController.avatar);
router.get('/users/',UserController.getUsers);
router.get('/user/:userId',UserController.getUser);

module.exports= router;