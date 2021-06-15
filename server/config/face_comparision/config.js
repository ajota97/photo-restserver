const AWS = require('aws-sdk');
const bucket = 'images-ajota'; // the bucketname without s3://
const photo_source = '1610776279014.jpg';
const photo_target = '1610776279014.jpg';


var config = new AWS.Config({
    accessKeyId: 'AKIAWS2E7YQUQFKGFA5R',
    secretAccessKey: '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',
    region: 'us-east-1'
});




AWS.config = config;


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



/*
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
*/

const params = {
    "CollectionId": "TestCollection",
    "Image": {
        "S3Object": {
            "Bucket": "images-ajota",
            "Name": "1622417443317.jpg"
        }
    },
    "MaxFaces": 200,
    "QualityFilter": "AUTO"
};


const collection = {
    "CollectionId": "TestCollection",
    "Image": {
        "S3Object": {
            "Bucket": "images-ajota",
            "Name": "1622417443126.jpg",
        },
    },
    "ExternalImageId": "diana.jpg",
    "DetectionAttributes": [
        "DEFAULT"
    ],
    "MaxFaces": 200,
    "QualityFilter": "AUTO"
};



const collectionId = {
    "CollectionId": "TestCollection",
};

var controller = {

    ////FACE COMPARISION
    face: (req, res) => {

        const client = new AWS.Rekognition();


        //Creating a new collection
        /* client.createCollection(collectionId, (err, response) => {
             if (err) return res.json({ err });
             res.json({ response });
         });*/




        //add to collection
        /*client.indexFaces(collection, (err, data) => {
            if (err) return res.json({ err });
            res.json({ data });
        });*/



        //Delete collection
        /*client.deleteCollection(collectionId, (err, data) => {
            if (err) return res.json({ err });
            res.json({ data });
        });*/



        //Show all the collection faces
        /*client.listFaces(collectionId, (err, data) => {
            if (err) return res.json({ err });
            res.json({ data });
        });*/



        //Search a face of any collection
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



        //Face comparision another methods
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