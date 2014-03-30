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
var reply_text = "Hello world";

//-------end module scope variable declaration--------

//-------begin server configuration-------------------
module.exports = function( app ) {
    app.get( '/',function  (req, res) {
        //a simple http server
        res.setHeader( 'Content-length', reply_text.length );
        res.writeHead(200 ,{ 'Content-type' : 'text/plain' });
        res.end( reply_text );
        if (reply_text.length) {
            //calculate and randamize string
            console.log("length : " + " " + reply_text.length);
            console.log(process.env.NODE_ENV);
        }
    });

};

//-------end server configuration--------------------