const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
const Schema = mongoose.Schema;



var imageSchema = Schema({
    name: {
        type: String,
        required: false
    },
    status: {
        type: Boolean,
        default: false,
        required: false
    },
    price: {
        type: Number,
        get: getPrice,
        set: setPrice
    }

});


let serviceSchema = new Schema({
    name: {
        type: String,
        required: [true, 'Name is required']
    },

    address: {
        type: String,
        required: [true, 'Email is required']
    },
    date: {
        type: String,
        required: [true, 'Date is required']
    },

    time: {
        type: String,
        required: [true, 'Time is required']
    },

    note: {
        type: String,
        required: false
    },

    img: [imageSchema],

    qr: {
        type: String,
        required: false
    },

    client: {
        type: Schema.Types.ObjectId,
        ref: 'Client',
        required: [true, 'The client is neccesary']
    },
    photoStudio: {
        type: Schema.Types.ObjectId,
        ref: 'PhotoStudio',
        required: [true, 'The photoStudio is neccesary']
    },


});


function getPrice(num) {
    return (num / 100).toFixed(2);
}

function setPrice(num) {
    return num * 100;
}



serviceSchema.plugin(uniqueValidator, { message: '{PATH} have to be unique' });
module.exports = mongoose.model('Service', serviceSchema);