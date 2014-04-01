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
    gpioController = require('../libs/gpioController'),
    gpio = require('pi-gpio');

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
            res.send({
                pins: gpioController.pins
            });
        console.log("accessed pin list" + " "+ gpioController.pins);
    });

    app.get('/gpio/:pin_no([0-9]+)/:direction((in|out))/:value((0|1))',
        function(req, res) {
            var pin = req.params.pin_no,
                direction = req.params.direction,
                value = req.params.value;

            gpio.open(pin, direction, function(err){
                 gpio.write(pin, value, function(){
                     gpio.close(pin);
                     var report = {
                         message:"success",
                         pin: pin,
                         direction: direction,
                         value: value
                     };

                     console.log(report);
                     res.send(report);
                 });
            });
    });


};

//-------end server configuration--------------------