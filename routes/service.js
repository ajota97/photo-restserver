const express = require('express');
const app = express();

var ServiceController = require('../controllers/service');
const { verificaToken } = require('../server/middlewares/autenticacion');

//Routes
app.post('/service', ServiceController.create);
app.get('/qr/:id', ServiceController.QRgenerator);
app.get('/service/:id', verificaToken, ServiceController.getServiceByPhotoStudio);
app.get('/serviceid/:id', ServiceController.getServiceById);
app.get('/service/imageurl/:id', ServiceController.getUrlImageById);
app.get('/service/cliente/:id', ServiceController.getServiceByClient);
//app.put('/photo/:id', PhotoController.update);







module.exports = app;