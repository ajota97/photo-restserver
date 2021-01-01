require('./config/config');
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

//Cargar index de rutas
//app.use(require('../routes/index_routes'));

//Middlewares
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//Connection MongoDb by mongoose
mongoose.connect('mongodb://localhost:27017/photoStudio', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true
}, (err, res) => {

    if (err) throw err;

    console.log('Database ONLINE');

});


app.listen(process.env.PORT, () => {
    console.log('Escuchando el puerto:', process.env.PORT);
});