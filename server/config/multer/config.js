const multer = require('multer');
const multerS3 = require('multer-s3');
const aws = require('aws-sdk');


const s3 = new aws.S3({
    accessKeyId: 'AKIAWS2E7YQUR3HXXYU4',
    secretAccessKey: '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',
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