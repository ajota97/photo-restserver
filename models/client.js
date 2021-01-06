const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
const Schema = mongoose.Schema;

let clientSchema = new Schema({
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

});

clientSchema.methods.toJSON = function() {
    let client = this;
    let clientObject = client.toObject();
    delete clientObject.password;
    return clientObject;
}

clientSchema.plugin(uniqueValidator, { message: '{PATH} have to be unique' });

module.exports = mongoose.model('Client', clientSchema);