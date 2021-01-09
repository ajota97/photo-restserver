require('./config/config');
const express = require('express');
const mongoose = require('mongoose');
const app = express();
const bodyParser = require('body-parser');

//Configurando el cors
const cors = require('cors');
app.use(cors());

//Middlewares
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//Cargar index de rutas
app.use(require('../routes/index_routes'));

//Connection MongoDb by mongoose
mongoose.connect(process.env.URLDB, {
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