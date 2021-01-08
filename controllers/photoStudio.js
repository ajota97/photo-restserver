const bcrypt = require('bcrypt');
const _ = require('underscore');
let PhotoStudio = require('../models/photoStudio');
let Service = require('../models/service');

var controller = {
    /***************
     Create
     ***************/
    create: (req, res) => {

        //Pick up data from body
        let body = req.body;

        //Create and fill the client
        let photoStudio = new PhotoStudio({
            name: body.name,
            email: body.email,
            password: bcrypt.hashSync(body.password, 10),
            phone: body.phone,
            description: body.description,
            address: body.address,
        });

        //Save client to the DB
        photoStudio.save((err, photoStudio) => {
            if (err) {
                return res.status(500).json({
                    ok: false,
                    err
                });
            }


            res.json({
                ok: true,
                photoStudio
            });

        }); //end save

    }, //End createclient


    /***************
    Update
    ***************/
    update: (req, res) => {

        let id = req.params.id;

        let body = _.pick(req.body, ['name', 'email', 'phone', 'description', 'address']);

        PhotoStudio.findByIdAndUpdate(id, body, { new: true, runValidators: true, context: 'query' }, (err, photoStudio) => {
            if (err) {
                return res.status(400).json({
                    ok: false,
                    err
                });
            }

            res.json({
                ok: 'true',
                photoStudio
            });

        }); //End findAndUpdate

    }, //Close update

    /***************
    GetAllServices
    ***************/

    getService: (req, res) => {


        let from = Number(req.query.from) || 0;
        let id = req.params.id;

        Service.find({ photoStudio: id })
            .skip(from)
            .limit(5)
            .populate('client', 'name')
            .populate('photoStudio', 'name')
            .exec((err, services) => {
                if (err) {
                    return res.status(500).json({
                        ok: false,
                        err
                    });
                }

                res.json({
                    ok: true,
                    services
                });
            });

    }, //End get all the services




};
module.exports = controller;