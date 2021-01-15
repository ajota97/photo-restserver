const express = require('express');
const app = express();
const { uploadS3 } = require('../server/config/multer/config');
//var { upload } = require('../controllers/upload_images');
//const cloudinary = require('cloudinary').v2;
//const fs = require('fs');
let Service = require('../models/service');


//Configure cloudinary
/*cloudinary.config({
    cloud_name: 'dof8qsn7q',
    api_key: '957525839344566',
    api_secret: 'Teq3OZAHtM7NQgCxVQ3VVvwHHpM'
});*/

//Upload to S3
//app.post('/upload/image', imageController.upload);
var data = {};
var img;

app.post('/upload/image/:id/:price', uploadS3.array('file0', 12), function(req, res, next) {

    data.data = req.files;
    for (let i = 0; req.files.length > i; i++) {
        //Guardar todos los link del array en el atributo img del servicio
        img = data.data[i].location
        let id = req.params.id;
        let price = req.params.price;

        Service.findById(id, (err, serviceDB) => {
            if (err) { return res.status(404).json({ ok: false, err: { message: 'Servicio no encontrado!' } }); }

            serviceDB.img.push({
                url: data.data[i].location,
                price: price
            });

            serviceDB.save((err, service) => {
                if (err) { return res.status(500).json({ ok: false, err }); }
            });
        });

    } //End ciclo FOR

    res.status(200).json({
        ok: true,
        message: 'Imagenes subidas correctamente',
    });

}); //End postImage





//app.get('/qr/:id', ServiceController.QRgenerator);
//app.put('/photo/:id', PhotoController.update);*/

/*
//////////////////
//upload to Cloudinary
///////////////////
app.post('/upload/image', (req, res) => {

    upload(req, res, (err) => {

        if (err) {
            return res.status(500).json({
                ok: false,
                err
            });
        }

        //res.json(req.files);
        var i = 0;
        var data;

        //Recorremos todo el array para subir varias imagenes entre si
        for (let i = 0; req.files.length > i; i++) {
            //Guardar en cloudinary la imagen con marca de agua y obtener la url
            cloudinary.uploader.upload(req.files[i].path, {
                effect: "overlay",
                overlay: "xxlnqttjdjv7oetymjef",
                width: 1500,
                height: 1500,
                opacity: 50,
                crop: "scale"
            }, (err, result) => {
                if (err) { return res.status(500).json({ ok: false, err }); }

                //Captura el link de la imagen con marca de agua
                fakeImg = result.url;

                //Guardar en cloudinary la imagen original y obtener la url
                //cloudinary.uploader.upload(req.files[i].path, (err, result) => {
                   // if (err) { return res.status(500).json({ ok: false, err }); }

                    //Captura el link de la imagen original
                    realImg = result.url;
                    //Guardamos ambos link en la DB con un solo id 
                    /*
                    return res.status(200).json({
                        fakeImg,
                        realImg
                    });*/
/* });
                fs.unlinkSync(req.files[i].path);

          //  });

        } //End Of for cicle

        res.status(200).json({
            ok: true,
            message: 'Subida exitosa'
        });

    });


});*/



module.exports = app;