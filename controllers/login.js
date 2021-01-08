const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
let PhotoStudio = require('../models/photoStudio');

var controller = {

    /***************
     Login
     ***************/
    login: (req, res) => {

        let body = req.body;

        PhotoStudio.findOne({ email: body.email }, (err, photoDB) => {

            if (err) {
                return res.status(500).json({
                    ok: false,
                    err
                });
            }

            if (!photoDB) {
                return res.status(400).json({
                    ok: false,
                    err: {
                        message: 'invalid user or password'
                    }
                });
            }

            if (!bcrypt.compareSync(body.password, photoDB.password)) {
                return res.status(400).json({
                    ok: false,
                    err: {
                        message: 'invalid user or password'
                    }
                });
            }

            let token = jwt.sign({
                photoStudio: photoDB
            }, process.env.SEED, { expiresIn: process.env.CADUCIDAD_TOKEN });

            res.json({
                ok: true,
                photoStudio: photoDB,
                token
            });


        }); //End login

    }


}

module.exports = controller;