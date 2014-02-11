/* 
 * serveApp.js - Hello World
*/

/* jslint   node  : true , continue : true,
    devel         : true , indent   : 2,    maxerr   : 50,
    newcap        : true , nomen    : true, plusplus : true,
    regexp        : true , sloppy   : true, vars     : false
*/

/* global variables declaration */

var
    http = require( 'http' ),
    response_text = "Hello world";



serveApp = http.createServer( function  (req,res) {
    //a simple http server
    res.writeHead(200 ,{ 'Content-type' : 'text/plain' });
    console.log(req.url);
    res.end("hello world");
}).listen(3030);

console.log("server listening on port %d",serveApp.address().port);