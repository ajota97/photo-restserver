const express = require('express');
const app = express();
const { verificaToken } = require('../server/middlewares/autenticacion');

var PhotoController = require('../controllers/photoStudio');

//Routes
app.post('/photo', PhotoController.create);
app.put('/photo/:id', PhotoController.update);
app.get('/photo/:id', verificaToken, PhotoController.getService);








module.exports = app;