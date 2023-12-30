const mongoose = require('mongoose');
const {Schema} = mongoose;
const fileSchema = new Schema({
    name : {
        type : String,
        required : true
    },
    location : {
        type: String,
        required: true
    },
    password : {
        type: String,
        required: true,
    },
    downloads : {
        type: Number,
        default : 0
    },
    createdAt: {
        type: Date,
        default: Date.now
    }

});

module.exports = mongoose.model('files',fileSchema);