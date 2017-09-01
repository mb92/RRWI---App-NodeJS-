
// **** Dependencies ****
var express    = require('express');        // call express
var app        = express();                 // define our app using express
var bodyParser = require('body-parser');	//call body-parser
var http = require('http');   				//the http server
//var sys = require("sys");   				//for system calls 
var util = require('util');   				//replaces sys
var fs = require('fs'); 					//moving files
//*************************

// **** Configure ****
// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var port = process.env.PORT || 3000;        // set our port


var command_output = ''; //this will contain output of commands that we're run with runCommand fuction...
var files = []; //array of files uploaded

//we need to just to interface with pronsole.py that works perfectly !
var spawn    = require('child_process').spawn;

///home/pi/printrun/pronsole.py
//var pronsole = spawn('python', ['/home/pi/printrun/test2.py','']);
var pronsole = spawn('python', ['/home/pi/printrun/pronsole.py','']);
//*************************

// **** Routes for api ****
// =============================================================================
var router = express.Router();              // get an instance of the express Router

// test route to make sure everything is working (accessed at GET http://localhost:<port>/api/<routename>)
// router.get('/', function(req, res) {
//     res.json({ message: 'api works' });   
// });

//GET:
var testRoute = require('./routes/test');
app.use('/test', testRoute);

var exitRoute = require('./routes/exit');
app.use('/exit', exitRoute);

var offRoute = require('./routes/off');
app.use('/off', offRoute);

var lsRoute = require('./routes/ls');
app.use('/ls', lsRoute);

var resetRoute = require('./routes/reset');
app.use('/reset', resetRoute);

var resumeRoute = require('./routes/resume');
app.use('/resume', resumeRoute);

var gettempRoute = require('./routes/gettemp');
app.use('/gettemp', gettempRoute);

var printRoute = require('./routes/print');
app.use('/print', printRoute);

var etaRoute = require('./routes/eta');
app.use('/eta', etaRoute);

var monitorRoute = require('./routes/monitor');
app.use('/monitor', monitorRoute);

var monitor2Route = require('./routes/monitor2');
app.use('/monitor2', monitor2Route);

var disconnectRoute = require('./routes/disconnect');
app.use('/disconnect', disconnectRoute);


//POST:
var paramsRoute = require('./routes/params');
app.use('/params', paramsRoute);

var moveRoute = require('./routes/move');
app.use('/move', moveRoute);

var bedtempRoute = require('./routes/bedtemp');
app.use('/bedtemp', bedtempRoute);

var settempRoute = require('./routes/settemp');
app.use('/settemp', settempRoute);

var homeRoute = require('./routes/home');
app.use('/home', homeRoute);

var extrudeRoute = require('./routes/extrude');
app.use('/extrude', extrudeRoute);

var reverseRoute = require('./routes/reverse');
app.use('/reverse', reverseRoute);

var uploadRoute = require('./routes/upload');
app.use('/upload', uploadRoute);

var sdprintRoute = require('./routes/sdprint');
app.use('/sdprint', sdprintRoute);

// register routes - all of our routes will be prefixed with /api

// **** Pronsole connection ****
console.log('pronsole.py is spawned, waiting 3 seconds and sending connect...');
setTimeout( function(){
  //calling connect without params here (todo add ttyUSB etc, but hey the defaults work just fine now ;)
  pronsole.stdin.write('connect\n');
}, 3000 );

console.log('pronsole.py is spawned, waiting 3 seconds and sending monitor...');
setTimeout( function(){
  calling connect without params here (todo add ttyUSB etc, but hey the defaults work just fine now ;)
 pronsole.stdin.write('monitor\n'); //cool this just works like we want -> need some ajax though to feed it back to the browser...
}, 3000 );



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