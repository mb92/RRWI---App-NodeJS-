
// Dependencies
var express    = require('express');        // call express
var app        = express();                 // define our app using express
var bodyParser = require('body-parser');	//call body-parser

// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var port = process.env.PORT || 8080;        // set our port


var http = require('http');             //the http server
//var sys = require("sys");   //for system calls 
var util = require('util');   //replaces sys

var fs = require('fs'); //moving files

var command_output = ''; //this will contain output of commands that we're run with runCommand fuction...
var files = []; //array of files uploaded

//we need to just to interface with pronsole.py that works perfectly !
var spawn    = require('child_process').spawn;

///home/pi/printrun/pronsole.py
//var pronsole = spawn('python', ['/home/pi/printrun/test2.py','']);
var pronsole = spawn('python', ['/home/pi/printrun/pronsole.py','']);






// ROUTES FOR OUR API
// =============================================================================
var router = express.Router();              // get an instance of the express Router


/** ROUTES FOR API **/
// test route to make sure everything is working (accessed at GET http://localhost:8080/api)
router.get('/', function(req, res) {
    res.json({ message: 'api works' });   
});

router.get('/test', function(req, res) {
    res.json({ message: 'test' });   
});

// POST method route
router.post('/params/:p1', function (req, res) {
  console.log(req.params.p1);
  res.send(req.params);
});

router.post('/moveforward', function (req, res) {
   console.log('-- move forward ==');
   pronsole.stdin.write('move y 10\n');
   res.send("was move");
});







// REGISTER OUR ROUTES -------------------------------
// all of our routes will be prefixed with /api
app.use('/api', router);







console.log('pronsole.py is spawned, waiting 3 seconds and sending connect...');
setTimeout( function(){
  //calling connect without params here (todo add ttyUSB etc, but hey the defaults work just fine now ;)
  pronsole.stdin.write('connect\n');
}, 3000 );

//console.log('pronsole.py is spawned, waiting 3 seconds and sending monitor...');
//setTimeout( function(){
  //calling connect without params here (todo add ttyUSB etc, but hey the defaults work just fine now ;)
//  pronsole.stdin.write('monitor\n'); //cool this just works like we want -> need some ajax though to feed it back to the browser...
//}, 3000 );



pronsole.stdout.on('data', function (data) {
  console.log( 'pronsole: '+data ); //todo use some ajax to feed it to our browser here...
});

pronsole.stderr.on('data', function (data) {
  console.log('pronsole err: ' + data);
});

pronsole.stdout.on('end', function(data) {
  pronsole.stdout.end();
} );

pronsole.on('exit', function (code) {
  if (code !== 0) {
    console.log('pronsole process exited with code ' + code);
  }
  console.log('pronsole exited!');
  pronsole.stdin.end(); 
  //todo just respawn pronsole here!!!
});

// START THE SERVER
// =============================================================================
app.listen(port);
console.log('Server is running on port: ' + port);