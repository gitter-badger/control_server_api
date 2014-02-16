/*
 * serveApp.js - Hello World using Express
*/

/* jslint   node  : true , continue : true,
    devel         : true , indent   : 2,    maxerr   : 50,
    newcap        : true , nomen    : true, plusplus : true,
    regexp        : true , sloppy   : true, vars     : false
*/

// -------------------module level scope variables------------------------
'use strict';

var
    connectInstance,serveApp,
    http = require( 'http' ),
    express = require( 'express' ),

    app = express(),
    reply_text = "Hello world",
    serveApp = http.createServer(app);
//--------------------end module scope variables--------------------------

//--------------------server configuration--------------------------------
app.configure( function() {
    app.use( express.logger() );
    app.use( express.bodyParser() );
    app.use( express.methodOverride() );
  });

app.get( '/',function  (req,res) {
    //a simple http server
    res.setHeader( 'Content-length', reply_text.length );
    res.writeHead(200 ,{ 'Content-type' : 'text/plain' });
    res.end( reply_text );
    if (reply_text.length) {
      //calculate and randamize string
      console.log("length : " + " " + reply_text.length);
    }
  });
//--------------------end server configuration-----------------------------

serveApp.listen( 3030 );

console.log( "server listening on port %d",serveApp.address().port );
