const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
const Schema = mongoose.Schema;

let photoSchema = new Schema({
    name: {
        type: String,
        unique: false,
        required: [true, 'The name is required']
    },

    email: {
        type: String,
        unique: true,
        required: [true, 'The email is required']
    },
    password: {
        type: String,
        required: [true, 'The password is required']
    },

    phone: {
        type: String,
        required: false
    },

    img: {
        type: String,
        required: false
    },
    description: {
        type: String,
        required: false,
    },
    address: {
        type: String,
        required: false
    }

});

//Delete password form the json response
photoSchema.methods.toJSON = function() {
    let photo = this;
    let photoObject = photo.toObject();
    delete photoObject.password;
    return photoObject;
}


photoSchema.plugin(uniqueValidator, { message: '{PATH} have to be unique' });
module.exports = mongoose.model('PhotoStudio', photoSchema);