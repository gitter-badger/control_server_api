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
var
    gpioController = require('.././api'),
    pin,direction,value;

//-------end module scope variable declaration--------

//-------begin server configuration-------------------
module.exports = function( app ) {
    app.get( '/',function  (req, res) {
        //a simple http server
        res.setHeader( 'Content-length', gpioController.greet.length );
        res.writeHead(200 ,{ 'Content-type' : 'text/plain' });
        res.end( gpioController.greet );
        if (gpioController.greet.length) {
            //calculate and randamize string
            console.log("length : " + " " + gpioController.greet.length);
            //console.log(process.env.NODE_ENV);
        }
    });

    app.all('/gpio/*?', function(req, res, next) {
       res.contentType( 'json' );
       next();
    });

    app.get('/gpio/pinlist', function(req, res) {
            res.send({
                pinlist: gpioController.pinlist
            });
        console.log("accessed pin list" + " "+ gpioController.pinHolder);
    });

    app.get('/gpio/:pin_no([0-9]+)/:direction/:state((0|1))',
        function(req, res) {
            var
                pin = req.params.pin_no,
                direction = req.params.direction,
                value = req.params.state,
                result;

            result = gpioController.triggerPin(pin, direction, value);
/*
            gpio.open(pin, direction, function(err){
                 gpio.write(pin, value, function(){
                     gpio.close(pin);
                     report = {
                         message:"success",
                         pin: pin,
                         direction: direction,
                         value: value
                     };

                     console.log(report);
                     res.send(report);
                 });
            }); */
            res.send(result);
            console.log(result);
    });

};

//-------end server configuration--------------------