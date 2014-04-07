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
    http = require( 'http' ),
    appConfig = require( './config/node-express' ),
    app = appConfig.loadApp,
    serveApp = http.createServer(app);
//--------------------end module scope variables--------------------------

//--------------------server configuration--------------------------------

appConfig.set_mode('production');
require('./routes/routes')(app);

//--------------------end server configuration-----------------------------

serveApp.listen( 3030 );

console.log( "server listening on port %d",serveApp.address().port );
