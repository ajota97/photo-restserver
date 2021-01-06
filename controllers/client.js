const bcrypt = require('bcrypt');
const _ = require('underscore');
let Client = require('../models/client');

var controller = {
    /***************
    Create client
    ***************/
    create: (req, res) => {

        //Pick up data from body
        let body = req.body;

        //Create and fill the client
        let client = new Client({
            name: body.name,
            email: body.email,
            password: bcrypt.hashSync(body.password, 10),
            phone: body.phone
        });

        //Save client to the DB
        client.save((err, clientDB) => {
            if (err) {
                return res.status(500).json({
                    ok: false,
                    err
                });
            }


            res.json({
                ok: true,
                client: clientDB
            });

        }); //end save

    }, //End createclient

    /***************
    Update client
    ***************/
    update: (req, res) => {

        let id = req.params.id;

        let body = _.pick(req.body, ['name', 'email', 'phone']);

        Client.findByIdAndUpdate(id, body, { new: true, runValidators: true, context: 'query' }, (err, clientDB) => {
            if (err) {
                return res.status(400).json({
                    ok: false,
                    err
                });
            }

            res.json({
                ok: 'true',
                client: clientDB
            });

        }); //End findAndUpdate

    }, //Close update


    test: (req, res) => {
        res.json({
            ok: true,
            message: 'Este es un test para produccion'
        });
    }
};
module.exports = controller;