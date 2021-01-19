const express = require('express');
const app = express();

var LoginController = require('../controllers/login');

//Routes
app.post('/login/photostudio', LoginController.login);
app.post('/login/client', LoginController.loginClient);
/*app.put('/photo/:id', PhotoController.update);
app.get('/photo/:id', PhotoController.getService);*/







module.exports = app;