const express = require('express');
const app = express();

var ClientController = require('../controllers/client');

//Routes
app.post('/client', ClientController.create);
app.put('/client/:id', ClientController.update);







module.exports = app;