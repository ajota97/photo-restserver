const _ = require('underscore');
const QRCode = require('qrcode');
let Service = require('../models/service');


var controller = {
    /***************
    Create client
    ***************/
    create: (req, res) => {

        //Pick up data from body
        let body = req.body;

        //Create and fill the service
        let service = new Service({
            name: body.name,
            address: body.address,
            date: body.date,
            time: body.time,
            note: body.note,
            client: body.client,
            photoStudio: body.photoStudio

        });

        //Save service to the DB
        service.save((err, service) => {
            if (err) {
                return res.status(500).json({
                    ok: false,
                    err
                });
            }



            res.json({
                ok: true,
                service,
            });


        }); //end save

    }, //End createService

    QRgenerator: (req, res) => {
        let id = req.params.id;

        Service.findById(id).exec((err, serviceDB) => {

            if (err) {
                return res.status(500).json({
                    ok: false,
                    err
                });
            }

            let message = [
                serviceDB._id + '\n',
                serviceDB.name + '\n',
                serviceDB.address + '\n',
                serviceDB.date + '\n',
                serviceDB.time + '\n',
                serviceDB.note + '\n'
            ];

            QRCode.toDataURL(message, (err, url) => {

                if (err) {
                    return res.status(500).json({
                        ok: false,
                        err
                    });
                }

                Service.findById(id, (err, serviceDB) => {

                    serviceDB.qr = url;

                    serviceDB.save((err, service) => {
                        res.json({
                            ok: true,
                            service
                        });
                    });

                });

            }); //End QRcode

        });

    }, //End qr generator



    /***************
    GetAllServices
    ***************/

    getServiceByPhotoStudio: (req, res) => {


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

    getServiceById: (req, res) => {

        let from = Number(req.query.from) || 0;
        let _id = req.params.id;

        Service.findById({ _id })
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


    }, //End GetServiceById

    getUrlImageById: (req, res) => {
        let from = Number(req.query.from) || 0;
        let _id = req.params.id;

        Service.findById({ _id })
            .skip(from)
            .limit(5)
            .exec((err, services) => {
                if (err) {
                    return res.status(500).json({
                        ok: false,
                        err
                    });
                }

                res.json({
                    ok: true,
                    imageUrl: services.img
                });
            });

    }, //End GetUrlImageById

    getServiceByClient: (req, res) => {



        let id = req.params.id;

        Service.find({ client: id })
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

    },





};









module.exports = controller;