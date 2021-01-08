const express = require('express');
const app = express();

//Calling the routes defined
app.use(require('./client'));
app.use(require('./photoStudio'));
app.use(require('./service'));
app.use(require('./login'));




module.exports = app;