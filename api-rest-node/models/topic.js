'user strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var mongoosePaginate = require('mongoose-paginate-v2');

//Model de comentario
var CommentsSchema = Schema({
    content: String,
    date: { type: Date, default: Date.now },
    user: { type: Schema.ObjectId, ref: 'User' }
});

// var Comment= mongoose.model('Comment', CommentSchema);

//Modelo de topics
var TopicSchema = Schema({
    title: String,
    content: String,
    code: String,
    lang: String,
    date: { type: Date, default: Date.now },
    user: { type: Schema.ObjectId, ref: 'User' },
    comments:[CommentsSchema]
});

//Cargar paginacion
TopicSchema.plugin(mongoosePaginate);



//como crear el modelo y la tabla pero en mongodb
module.exports = mongoose.model('Topic', TopicSchema);



