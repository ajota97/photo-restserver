const express = require('express');
const app = express();

var ServiceController = require('../controllers/service');

//Routes
app.post('/service', ServiceController.create);
app.get('/qr/:id', ServiceController.QRgenerator);
//app.put('/photo/:id', PhotoController.update);







module.exports = app;