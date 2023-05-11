'use-strict'

var validator = require('validator');
var Topic = require('../models/topic');

var controller = {
    add: function (req, res) {
        var topicId = req.params.topicId

        Topic.find({ _id: topicId })
            .exec((err, topic) => {
                if (err) {
                    return res.status(400).send({
                        status: 'error',
                        mensage: 'Error al encontrar el topic'
                    })
                }
                if (!topic) {
                    return res.status(404).send({
                        status: 'error',
                        mensage: 'No existe el topic'
                    })
                } else {
                    if (req.body.content) {
                        try {


                            var validate_content = !validator.isEmpty(req.body.content);;



                        } catch (err) {
                            return res.status(200).send({
                                status: 'error',
                                mensage: 'No has comentado nada'
                            })
                        }

                        if (validate_content) {


                            var comment = {
                                user: req.user.sub,
                                content: req.body.content
                            };


                            topic[0].comments.push(comment);


                            var topicUpdated = new Topic();
                            topicUpdated = topic;



                            Topic.findOneAndUpdate({ _id: topicUpdated[0]._id }, topicUpdated[0], { new: true }, (err, topicUpdated) => {
                                if (err) {
                                    return res.status(400).send({
                                        status: 'error',
                                        mensage: 'Error al guardar el comentario'
                                    })
                                }

                                if (!topicUpdated) {
                                    return res.status(400).send({
                                        status: 'error',
                                        mensage: 'El comentario no se a guardado correctamente, pruebe con otro'
                                    })
                                }

                                else {
                                    return res.status(200).send({
                                        status: 'success',
                                        topicUpdated
                                    })
                                }
                            })

                        } else {
                            return res.status(404).send({
                                status: 'error',
                                mensage: 'No se han validado los datos correctamente'
                            })
                        }


                    } else {
                        return res.status(404).send({
                            status: 'error',
                            mensage: 'Faltan datos'
                        })
                    }
                }

            })




    },
    update: function (req, res) {
        var commentId = req.params.commentId;


        var params = req.body;
        console.log(commentId);

        try {


            var validate_content = !validator.isEmpty(req.body.content);;



        } catch (err) {
            return res.status(200).send({
                status: 'error',
                mensage: 'No has comentado nada'
            })
        }

        if (validate_content) {
            Topic.findOneAndUpdate(
                { "comments._id": commentId },
                {
                    "$set": {
                        "comments.$.content": params.content
                    }
                },
                { new: true },
                (err, topicUpdated) => {
                    if (err) {
                        return res.status(400).send({
                            status: 'error',
                            mensage: 'Error al actualizar el comentario'
                        })
                    }
                    if (!topicUpdated) {
                        return res.status(400).send({
                            status: 'error',
                            mensage: 'El comentario no se a actualizado correctamente, pruebe con otro'
                        })
                    }
                    else {
                        return res.status(200).send({
                            status: 'success',
                            topicUpdated
                        })
                    }
                }
            )
        }


    },
    delete: function (req, res) {
         var topicId= req.params.topicId;
         var  commentId= req.params.commentId;


         Topic.findById(topicId, (err, topic)=>{
            if (err) {
                return res.status(400).send({
                    status: 'error',
                    mensage: 'Error al encontrar el topic'
                })
            }
            if (!topic) {
                return res.status(404).send({
                    status: 'error',
                    mensage: 'No existe el topic'
                })
            } 
                //Aqui buscamos en comentario"Subdocumento"
                var comment = topic.comments.id(commentId);
            if(comment){
               
                comment.remove();
                console.log(topic)
                var topicUpdated = new Topic();
                topicUpdated = topic;

                Topic.findOneAndUpdate({ _id: topic._id }, topic, { new: true }, (err, topicUpdated) => {
                    if (err) {
                        return res.status(400).send({
                            status: 'error',
                            mensage: 'Error al guardar el topic'
                        })
                    }

                    if (!topicUpdated) {
                        return res.status(400).send({
                            status: 'error',
                            mensage: 'El topic no se a guardado correctamente, pruebe con otro'
                        })
                    }

                    else {
                        return res.status(200).send({
                            status: 'success',
                            topicUpdated
                        })
                    }
                })


            }else{
                return res.status(400).send({
                    status: 'error',
                    mensage: 'El comentario no existe'
                })
            }
         })
    }



}

//exportamos el controlador para usar las funciones
module.exports = controller;