'use strict'

var validator = require('validator');
var User = require('../models/user');
var bcrypt = require('bcrypt-nodejs');
var jwt = require('../services/jwt');
//creamos el controlador
var controller = {

    //las funciones del controlador
    save: function (req, res) {

        //Recoger los parametros de la peticiòn
        var params = req.body;
        //Validar los datos
        var validate_name = !validator.isEmpty(params.name);
        var validate_surname = !validator.isEmpty(params.surname);
        var validate_email = validator.isEmail(params.email) && !validator.isEmpty(params.email);
        var validate_password = !validator.isEmpty(params.password);

        if (validate_name && validate_surname && validate_email && validate_password) {
            //Crear el objeto de usurio
            var user = new User();
            //Asignar valores al usurio
            user.name = params.name;
            user.surname = params.surname;
            user.email = params.email.toLowerCase();
            user.role = 'ROLE_USER';
            user.image = null;
            //Comprobar si el usurio existe
            User.findOne({ email: user.email }, (err, issetUser) => {
                if (err) {
                    return res.status(500).send({
                        message: 'Error al comprobar duplicidadd de usurio',
                    })
                }
                if (!issetUser) {
                    //Si no existe

                    //Cifrar la contraseña 
                    bcrypt.hash(params.password, null, null, (err, hash) => {
                        user.password = hash;
                        //Guardar usurio
                        user.save((err, userStored) => {
                            if (err) {
                                return res.status(500).send({
                                    message: 'Error al guardar el usurio',
                                })
                            }
                            if (!userStored) {
                                return res.status(400).send({
                                    message: 'El usuario no se a guardado',
                                })
                            }
                            //Devolver respuesta
                            return res.status(200).send({
                                status: 'success',
                                user: userStored
                            });
                        });



                    })

                }
                else {
                    return res.status(200).send({
                        message: 'Este usuario ya existe',
                    })
                }
            })

        } else {
            return res.status(200).send({
                message: 'No se ha registrado correctamente, vuelva a intentarlo',
            })
        }



    },
    login: function (req, res) {
        //Recoger los parametros de la peticiòn
        var params = req.body;
        //Validar los datos
        var validate_email = validator.isEmail(params.email) && !validator.isEmpty(params.email);
        var validate_password = !validator.isEmpty(params.password);
        if (!validate_password && !validate_email) {
            return res.status(200).send({
                message: 'No se ha validado correctamente, vuelva a intentarlo',
            })

        }

        User.findOne({ email: params.email.toLowerCase() }, (err, user) => {

            if (err) {
                return res.status(500).send({
                    message: 'Error al intentar identificarse',
                })
            }
            if (!user) {
                return res.status(404).send({
                    message: 'Credenciales incorrectas, El usurio no existe',
                })
            }
            //comprobamos la contraseña
            bcrypt.compare(params.password, user.password, (err, check) => {
                if (check) {

                    if (params.gettoken) {
                        return res.status(200).send({

                            tocken: jwt.creaateTocken(user)
                        })
                    } else {

                        user.password = undefined;
                        return res.status(200).send({
                            status: 'success',
                            user
                        })
                    }

                }
                else {
                    return res.status(404).send({
                        message: 'Credenciales incorrectas, El usurio no existe',
                    })
                }
            })


        })




    },
    update: function (req, res) {
        //Recoge los datos del usuario
        var params = req.body;
        //Validar datos recividos
        try {
            var validate_name = !validator.isEmpty(params.name);
            var validate_surname = !validator.isEmpty(params.surname);
            var validate_email = validator.isEmail(params.email) && !validator.isEmpty(params.email);
        } catch (err) {
            return res.status(400).send({
                message: 'Faltan datos por enviar'
            })
        }
        if (!validate_name && !validate_surname && !validate_email) {
            return res.status(400).send({
                message: 'Rellena todos los campos'
            })
        }
        //Eliminar propiedades inecesarias
        delete params.password;
        //el id del usuario se consigue de authentication en payload
        var userId = req.user.sub;

        if (req.user.email != params.email) {
            User.findOne({ email: params.email.toLowerCase() }, (err, user) => {
                if (err) {
                    return res.status(500).send({
                        message: 'Error al intentar actualizar'
                    })
                }
                if (user && user.email == params.email) {
                    return res.status(500).send({
                        message: 'El email no puede ser modificado'
                    })
                } else {
                    //Buscar y actualizar el documento
                    User.findOneAndUpdate({ _id: userId }, params, { new: true }, (err, userUpdted) => {
                        if (err) {
                            return res.status(404).send({
                                status: 'error',
                                message: 'Error al actualizar el usuario'
                            })
                        }
                        if (!userUpdted) {
                            return res.status(404).send({
                                status: 'error',
                                message: 'El usuario no se a podido actualizar'
                            })
                        }


                        return res.status(404).send({
                            status: 'succes',
                            message: 'El usuario se a actualizado',
                            user: userUpdted
                        })
                    })
                }

            })
        }else{
               //Buscar y actualizar el documento
               User.findOneAndUpdate({ _id: userId }, params, { new: true }, (err, userUpdted) => {
                if (err) {
                    return res.status(404).send({
                        status: 'error',
                        message: 'Error al actualizar el usuario'
                    })
                }
                if (!userUpdted) {
                    return res.status(404).send({
                        status: 'error',
                        message: 'El usuario no se a podido actualizar'
                    })
                }


                return res.status(404).send({
                    status: 'succes',
                    message: 'El usuario se a actualizado',
                    user: userUpdted
                })
            })
        }
    },




    uploadAvatar: function (req, res) {
        return res.status(404).send({
            status: 'succes',
            message: 'metodo upload'
        })
    }
}
//exportamos el controlador para usar las funciones
module.exports = controller;

