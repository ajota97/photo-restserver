const AWS = require('aws-sdk')
const bucket = 'images-ajota' // the bucketname without s3://
const photo_source = '1610776279014.jpg'
const photo_target = '1610776279014.jpg'


var config = new AWS.Config({
    accessKeyId: 'AKIAWS2E7YQUR3HXXYU4',
    secretAccessKey: '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',
    region: 'us-east-1'
})



AWS.config = config


/*const params = {
    SourceImage: {
        S3Object: {
            Bucket: bucket,
            Name: photo_source
        },
    },
    TargetImage: {
        S3Object: {
            Bucket: bucket,
            Name: photo_target
        },
    },
    SimilarityThreshold: 70
}*/



const params = {
    "CollectionId": "TestCollection",
    "Image": {
        "S3Object": {
            "Bucket": "images-ajota",
            "Name": "1610776279014.jpg"
        }
    },
    "MaxFaces": 200,
    "QualityFilter": "AUTO"
}



const collection = {
    "CollectionId": "TestCollection",
    "Image": {
        "S3Object": {
            "Bucket": "images-ajota",
            "Name": "1610776278139.jpg",
        },
        "S3Object": {
            "Bucket": "images-ajota",
            "Name": "1610776278139.jpg",
        },
        "S3Object": {
            "Bucket": "images-ajota",
            "Name": "1610776279014.jpg",
        },
        "S3Object": {
            "Bucket": "images-ajota",
            "Name": "1610841830560.jpg",
        },
        "S3Object": {
            "Bucket": "images-ajota",
            "Name": "1610776279014.jpg",
        }
    },
    "ExternalImageId": "test.jpg",
    "DetectionAttributes": [
        "DEFAULT"
    ],
    "MaxFaces": 200,
    "QualityFilter": "AUTO"
}

const parameter = {
    SourceImage: {
        S3Object: {
            Bucket: "images-ajota",
            Name: '1610776279014.jpg'
        },
        S3Object: {
            Bucket: "images-ajota",
            Name: '1610776279014.jpg'
        },
        S3Object: {
            Bucket: "images-ajota",
            Name: '1610776279014.jpg'
        },
    },
    TargetImage: {
        S3Object: {
            Bucket: "images-ajota",
            Name: '1610776279014.jpg'
        },
    },
    SimilarityThreshold: 70
}


const collectionId = {
    "CollectionId": "TestCollection",
}

var controller = {

    ////FACE COMPARISION
    face: (req, res) => {

        const client = new AWS.Rekognition();


        /*client.indexFaces(collection, (err, data) => {
            if (err) return res.json({ err });
            res.json({ data });
        });*/



        /* client.listFaces(collectionId, (err, data) => {
             if (err) return res.json({ err });
             res.json({ data });

         });*/

        client.searchFacesByImage(params, (err, response) => {
            if (err) {
                return res.status(500).json({
                    ok: false,
                    err
                });
            } else {

                res.json({
                    ok: true,
                    response,

                });
            }



        });

        /* client.compareFaces(parameter, function(err, response) {

              if (err) {
                  res.json({
                      err
                  });
              } else {
                  res.json({
                      response,

                  });

                  /*   response.FaceMatches.forEach(data => {
                         let position = data.Face.BoundingBox
                         let similarity = data.Similarity

                         res.status(200).json({
                             ok: true,
                             response,
                             message: `The face at: ${position.Left}, ${position.Top} matches with ${similarity} % confidence`
                         });

                     }); // for response.faceDetails*/


        // }
        // });





    }, //End face




}




module.exports = controller;