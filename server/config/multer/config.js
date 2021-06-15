const multer = require('multer');
const multerS3 = require('multer-s3');
const aws = require('aws-sdk');


const s3 = new aws.S3({
    accessKeyId: 'AKIAWS2E7YQUQFKGFA5R',
    secretAccessKey: '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',
    region: 'us-east-1'
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