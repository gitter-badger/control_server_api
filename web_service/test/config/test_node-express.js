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
    expressConfig = require( '../../ws_src/config/node-express' ),
    test = require( 'chai');

//--------------------end module scope variables--------------------------

describe( "node-express", function  () {
    // inside node-express module

    describe("#configEnvironment()", function  () {
            
            it( "should enable defined mode", function  () {
                var
                    i,
                    modes = ["production"];
                
                expressConfig.set_mode(modes[i]);
                test.expect(modes[i]).equal( process.env.NODE_ENV );
              });
          });
  });