//Port
process.env.PORT = process.env.PORT || 3000;

//Environment
process.env.NODE_ENV = process.env.NODE_ENV || 'dev';

//Database
let urlDB;

if (process.env.NODE_ENV == 'dev') {
    urlDB = 'mongodb://localhost:27017/photoStudio';
} else {
    urlDB = process.env.MONGO_URI;
}

process.env.URLDB = urlDB;

//Token expiration
process.env.CADUCIDAD_TOKEN = '48h';

//SEED
process.env.SEED = process.env.SEED || 'este-es-el-seed-desarrollo';