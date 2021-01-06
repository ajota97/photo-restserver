const express = require('express');
const app = express();

//Calling the routes defined
app.use(require('./client'));




module.exports = app;