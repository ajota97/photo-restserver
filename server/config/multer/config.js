const multer = require('multer');
const multerS3 = require('multer-s3');
const aws = require('aws-sdk');


const s3 = new aws.S3({
    accessKeyId: process.env.ACCESS_KEY_ID,
    secretAccessKey: process.env.SECRET_ACCESS_KEY,
    region: ''
});


exports.uploadS3 = multer({
    storage: multerS3({
        s3: s3,
        bucket: 'images-ajota',
        acl: 'public-read',
        metadata: function(req, file, cb) {
            cb(null, { fieldName: file.fieldname });
        },
        key: function(req, file, cb) {
            cb(null, Date.now().toString() + ".jpg")
        }
    })
});