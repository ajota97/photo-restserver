//Port
process.env.PORT = process.env.PORT || 3000;

//Environment
process.env.NODE_ENV = process.env.NODE_ENV || 'dev';

//Database
let urlDB;

if (process.env.NODE_ENV == 'dev') {
    urlDB = 'mongodb://localhost:27017/photoStudio';
} else {
    urlDB = 'mongodb+srv://ajota:jose8188258@cluster0.dhih4.mongodb.net/PhotoStudio';
}

process.env.URLDB = urlDB;