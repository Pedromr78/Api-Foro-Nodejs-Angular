'use strict'

var validator = require('validator');
var Topic = require('../models/topic');
//creamos el controlador
var controller = {

    save: function (req, res) {
        var params = req.body;

        try {

            var validate_title = !validator.isEmpty(params.title);
            var validate_content = !validator.isEmpty(params.content);;
            var validate_lang = !validator.isEmpty(params.lang);


        } catch (err) {
            return res.status(200).send({
                status: 'error',
                mensage: 'Faltan datos por enviar'
            })
        }

        if (validate_title && validate_content && validate_lang) {

            var topic = new Topic();

            topic.title = params.title;
            topic.content = params.content;
            topic.code = params.code;
            topic.lang = params.lang;
            topic.user = req.user.sub;

            topic.save((err, topicStored) => {
                if (err || !topicStored) {
                    return res.status(400).send({
                        status: 'error',
                        mensage: 'No se guardo el topic'
                    })
                } else {
                    return res.status(200).send({
                        status: 'succes',
                        topicStored
                    })
                }
            })


        } else {

            return res.status(400).send({
                status: 'error',
                mensage: 'La validacion a fallado, los datos no son validos'
            })

        }




    },
    getTopics: function (req, res) {

        if (!req.params.page || req.params.page == '0' || req.params.page == 0 || req.params.page == null || req.params.page == undefined) {
            var page = 1;
        } else {
            var page = parseInt(req.params.page);
        }


        var options = {
            // select: 'title date author',
            sort: { date: -1 },
            populate: 'user',
            // lean: true,
            // offset: 20,
            limit: 5,
            page: page
        };

        Topic.paginate({}, options, (err, topics) => {
            if (err) {
                return res.status(400).send({
                    status: 'error',
                    mensage: 'Error en la consulta',

                })

            }
            if (!topics) {
                return res.status(400).send({
                    status: 'error',
                    mensage: 'No hay topics'
                })


            } else {


                return res.status(200).send({
                    status: 'succes',
                    topics: topics.docs,
                    totalDocs: topics.totalDocs,
                    totalPages: topics.totalPages
                })
            }

        })


    },
    getTopicsByUser: function (req, res) {
        var userId = req.params.user

        Topic.find({ user: userId })
            .sort([['date', 'descending']])
            .exec((err, topics) => {
                if (err) {
                    return res.status(400).send({
                        status: 'error',
                        mensage: 'Error al buscar los topics del usuario',

                    })
                }
                if (!topics) {
                    return res.status(200).send({
                        status: 'error',
                        mensage: 'Este usuario no contiene topics',

                    })
                } else {
                    return res.status(200).send({
                        status: 'success',
                        topics

                    })
                }


            })
    },
    getTopic: function (req, res) {
        var topicId = req.params.id;

        Topic.findById(topicId)
            //Para meter en la propiedad usuario el usuario con todos los datos
            .populate('user')
            .populate('comments.user')
            .exec((err, topic) => {
                if (err) {
                    return res.status(400).send({
                        status: 'error',
                        mensage: 'Error al buscar el topic',

                    })
                }
                if (!topic) {
                    return res.status(200).send({
                        status: 'error',
                        mensage: 'Este topic no existe',

                    })
                } else {
                    return res.status(200).send({
                        status: 'success',
                        topic

                    })
                }


            })
    },
    update: function (req, res) {
        var topicId = req.params.id;

        var params = req.body;

        try {

            var validate_title = !validator.isEmpty(params.title);
            var validate_content = !validator.isEmpty(params.content);;
            var validate_lang = !validator.isEmpty(params.lang);


        } catch (err) {
            return res.status(200).send({
                status: 'error',
                mensage: 'Faltan datos por enviar'
            })
        }
        if (validate_title && validate_content && validate_lang) {
            var update = {
                title: params.title,
                content: params.content,
                code: params.code,
                lang: params.lang
            }



            Topic.findOneAndUpdate({ _id: topicId, user: req.user.sub }, update, { new: true }, (err, topicUpdated) => {



                if (err) {
                    return res.status(400).send({
                        status: 'error',
                        mensage: 'Error al actualizar el topic',

                    })
                }
                if (!topicUpdated) {
                    return res.status(200).send({
                        status: 'error',
                        mensage: 'Este topic no se a actualizado',

                    })
                } else {
                    return res.status(200).send({
                        status: 'success',
                        topicUpdated

                    })
                }

            })
        } else {

            return res.status(400).send({
                status: 'error',
                mensage: 'La validacion a fallado, los datos no son validos'
            })

        }



    },
    delete: function (req, res) {
        var topicId = req.params.id;

        Topic.findOneAndDelete({ _id: topicId, user:req.user.sub }, (err, topicRemoved) => {
            if(err){
                return res.status(400).send({
                    status: 'error',
                    mensage: 'Error al borrar el topic',

                })
            }
            if (!topicRemoved) {
                return res.status(200).send({
                    status: 'error',
                    mensage: 'Este topic no se a borrado o no existe',

                })
            } else {
                return res.status(200).send({
                    status: 'success',
                    topicRemoved

                })
              
            }
        })
    },
    search :function(req,res){
        var searchString= req.params.search;

        Topic.find({"$or":[
            {"title":{"$regex":searchString,"$options":"i"}},
            {"content":{"$regex":searchString,"$options":"i"}},
            {"lang":{"$regex":searchString,"$options":"i"}},
            {"code":{"$regex":searchString,"$options":"i"}}
        ]
        })
        .populate('user')
        .sort([['date', 'descending']])
        .exec((err,topics)=>{
            if(err){
                return res.status(500).send({
                    status: 'error',
                    mensage: 'Error en la peticion',

                })
            }
            if(!topics){
                return res.status(404).send({
                    status: 'error',
                    mensage: 'No hay topics disponibles',

                })
            }
            return res.status(200).send({
                status: 'success',
                topics

            })

        })
    }
}


//exportamos el controlador para usar las funciones
module.exports = controller;