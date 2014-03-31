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
var serviceGreeter = "Welcome! This is GPIO controller center." +
                        "Begin commanding" +" the define API.";

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
            console.log(process.env.NODE_ENV);
        }
    });

};

//-------end server configuration--------------------