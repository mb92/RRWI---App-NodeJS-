
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

var menu_items = ['home', 'printer', 'files', 'about'];
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
  res.send(req.params)
});







// REGISTER OUR ROUTES -------------------------------
// all of our routes will be prefixed with /api
app.use('/api', router);



// START THE SERVER
// =============================================================================
app.listen(port);
console.log('Server is running on port: ' + port);