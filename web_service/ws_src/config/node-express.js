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

//--------------------end module scope variables--------------------------


//--------------------server configuration--------------------------------

module.exports = ( function  () {
    // declare module scope variables
    var
        express = require( 'express'),
        app = express(),
        set_mode;
    // end module scope variable declaration

    set_mode = function  (mode) {

        app.configure( function  () {
            app.use( express.bodyParser() );
            app.use( express.methodOverride() );
            app.use( express.json() );
            app.use( express.urlencoded() );
            app.use( app.router );
          });

        if (mode === "development") {
          app.configure( 'development',function  () {
            app.use( express.logger() );
            app.use( express.errorHandler({
                dumpExceptions : true,
                showStack      : true             
              }) );
          });
        }

        if (mode === "production") {
          app.configure( 'production',function  () {
            app.use( express.logger('dev') );
            app.use( express.errorHandler({ }) );
          });
        }
      };

    return {
        set_mode : set_mode,
        loadApp  : app
      };

  })();
