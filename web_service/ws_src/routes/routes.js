/*
 * serveApp.js - Hello World using Express
 */

/* jslint   node  : true , continue : true,
 devel         : true , indent   : 2,    maxerr   : 50,
 newcap        : true , nomen    : true, plusplus : true,
 regexp        : true , sloppy   : true, vars     : false
 */

//-------define module scope variables----------------
'use strict';
var serviceGreeter = "Welcome! This is GPIO control center." +
                        "Begin commanding" +" the define API.",
    gpioController = require('../libs/gpioController');

//-------end module scope variable declaration--------

//-------begin server configuration-------------------
module.exports = function( app ) {
    app.get( '/',function  (req, res) {
        //a simple http server
        res.setHeader( 'Content-length', serviceGreeter.length );
        res.writeHead(200 ,{ 'Content-type' : 'text/plain' });
        res.end( serviceGreeter );
        if (serviceGreeter.length) {
            //calculate and randamize string
            console.log("length : " + " " + serviceGreeter.length);
            //console.log(process.env.NODE_ENV);
        }
    });

    app.all('/gpio/*?', function(req, res, next) {
       res.contentType( 'json' );
       next();
    });

    app.get('/gpio/pinlist', function(req, res) {

    });

    app.get('/gpio/:pin_no([0-9]+)/:direction/:value', function(req, res) {
       var
           report = gpioController.triggerPin(req.params.pin_no,
                                 req.params.direction.toString(),
                                 req.params.value);
        res.send(report);

    });


};

//-------end server configuration--------------------