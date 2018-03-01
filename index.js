
// **** Dependencies ****
var express    = require('express');        // call express
var app        = express();                 // define our app using express
var bodyParser = require('body-parser');	//call body-parser
var http = require('http');   				//the http server
//var sys = require("sys");   				//for system calls 
var util = require('util');   				//replaces sys
var fs = require('fs'); 					//moving filess


//*************************

// **** Configure ****
// configure app to use bodyParser()
// this will let us get the data from a POST
// app.use(bodyParser.urlencoded({ extended: true }));
// app.use(bodyParser.json());

var app = express();
// jsonParser = bodyParser.json();

var port = process.env.PORT || 3000;        // set our port

var command_output = ''; //this will contain output of commands that we're run with runCommand fuction...
var files = []; //array of files uploaded

//we need to just to interface with pronsole.py that works perfectly !
var spawn    = require('child_process').spawn;
var pronsole = spawn('python', ['/home/pi/printrun/pronsole.py','']);
var streaming = require('./cam.js');

var turnOn = null;
var turnOff = null;

var jsonParser = bodyParser.json({limit:'50mb', type:'application/json'});
var urlencodedParser = bodyParser.urlencoded({ extended:true, limit:'50mb', type:'application/x-www-form-urlencoding' })
// //*************************
// 


if ( typeof pronsole == 'undefined' && !pronsole )
{
 	return res.send('Error! Pronsole object is not defined.');
}





// **** Routes for api ****
// =============================================================================
app.get('/', function(req, res) {
    return res.json({ message: 'Welcome in RepRapWebInterface API' });   
});

app.get('/cameraOn', function(req, res) {
   var streaming = require('./cam.js');  
   // res.send("Camera is turn on");
   return res.json({ message: "Camera is turn ON"});
});

app.get('/cameraOff', function(req, res) {
   var streaming = null;  
   // res.send("Camera is turn off");
   return res.json({ message: "Camera is turn OFF"});
});

app.get('/turnOn', function(req, res) {
    var turnOn = spawn('python', ['/home/pi/rrwi/py/on.py','']);   
    // res.send("Power ON");
    return res.json({ message: "Power ON"});
});

app.get('/turnOff', function(req, res) {
    var turnOn = spawn('python', ['/home/pi/rrwi/py/off.py','']);
    // res.send("Power OFF");
    return res.json({ message: "Power OFF"});
});

//GET:
// == /off
app.get('/off', function (req, res) {
	if(pronsole) {
		pronsole.stdin.write('off \n');
		console.log('-- off --');
		// return res.send('off\n');
		res.sendStatus(200);
	} 

	return res.send('Error! Pronsole object is not defined.');
});

// == /exit
app.get('/exit', function (req, res) {
	if(pronsole) {
		pronsole.stdin.write('exit \n');
		console.log('-- exit --');
		return res.send('exit\n');
	} 

	return res.send('Error! Pronsole object is not defined.');
});

// == /off
app.get('/off', function (req, res) {
	if(pronsole) {
		pronsole.stdin.write('off \n');
		console.log('-- off --');
		// return res.send('off\n');
		res.sendStatus(200);
	} 

	return res.send('Error! Pronsole object is not defined.');
});

// == /ls
app.get('/ls', function (req, res) {
	
  // var command = spawn('python', ['/home/pi/printrun/pronsole.py','']);

  // pronsole.stdin.write('ls \n');
runCommand('ls', '', '/home/pi/printrun/' );
	// if(pronsole) {
	// var command = spawn('/home/pi/printrun/pronsole.py');
	// 	command.stdin.write('gettemp \n');
	// 	command.stdout.on('data', function (data) {
 //    		return res.send('stdout: ' + data);
 //    	});
 //    	

	// runCommand( 'ls', '-tr1', '/home/pi/printerface/gcode_uploads' );
	return res.send(command_output);
});

// == /reset
app.get('/reset', function (req, res) {
	if(pronsole) {
		pronsole.stdin.write('reset \n');
		console.log('-- reset --');
		return res.send('reset\n');
	} 

	return res.send('Error! Pronsole object is not defined.');
});

// == /pause
app.get('/pause', function (req, res) {
	if(pronsole) {
		pronsole.stdin.write('pause \n');
		console.log('-- pause --');
		return res.send('pause\n');
	} 

	return res.send('Error! Pronsole object is not defined.');
});

// == /cooldown
app.get('/cooldown', function (req, res) {
	if(pronsole) {
		pronsole.stdin.write('settemp 0 \n');
		pronsole.stdin.write('bedtemp 0 \n');
		console.log('-- cooldown --');
		return res.send('cooldown\n');
	} 

	return res.send('Error! Pronsole object is not defined.');
});


// == /resume
app.get('/resume', function (req, res) {
	if(pronsole) {
		pronsole.stdin.write('resume \n');
		console.log('-- resume --');
		return res.send('resume\n');
	} 

	return res.send('Error! Pronsole object is not defined.');
});

var textChunk = null;
// == /gettemp
app.get('/status', function (req, res) {
    res.send('Node RRWI API is running');
});

// == /gettemp
app.get('/gettemp', function (req, res) {
    if(pronsole) {
        pronsole.stdin.write('gettemp \n');
        pronsole.stdout.on('data',function(chunk){

        textChunk = chunk.toString('utf8');// buffer to string
        console.log(textChunk);
        });
        console.log('-- gettemp --');
        // res.json({asd : 'llll'});
        // res.json({ message: textChunk });
    }

    res.send('Error! Pronsole object is not defined.');
});

app.get('/eta', function (req, res) {
    if(pronsole) {
        pronsole.stdin.write('eta \n');
        pronsole.stdout.on('data',function(chunk){

        textChunk = chunk.toString('utf8');// buffer to string
        console.log(textChunk);
        });
        console.log('-- eta --');
        res.send(textChunk);
        // res.json({ message: textChunk });
    }

    res.send('Error! Pronsole object is not defined.');
});

// == /eta
// app.get('/eta', function (req, res) {
// 	if(pronsole) {
// 		pronsole.stdin.write('eta \n');
// 		console.log('-- eta --');
// 		return res.send('eta\n');
// 	} 

// 	return res.send('Error! Pronsole object is not defined.');
// });

// == /monitor
app.get('/monitor', function (req, res) {
	if(pronsole) {
		pronsole.stdin.write('monitor \n');
		console.log('-- monitor --');
		return res.send('monitor\n');
	} 

	return res.send('Error! Pronsole object is not defined.');
});

// == /monitor2
app.get('/monitor2', function (req, res) {
	if(pronsole) {
		pronsole.stdin.write('monitor2 \n');
		console.log('-- monitor2 --');
		return res.send('monitor2\n');
	} 

	return res.send('Error! Pronsole object is not defined.');
});

// == /disconnect
app.get('/disconnect', function (req, res) {
	if(pronsole) {
		pronsole.stdin.write('disconnect \n');
		console.log('-- disconnect --');
		return res.send('disconnect\n');
	} 

	return res.send('Error! Pronsole object is not defined.');
});


// //POST:
// == /move/..
app.post('/move/:dir/:dist/:acc?', function (req, res) {
	var direction = req.params.dir;
	var distance = req.params.dist; 
	var regExpAlpha = /[exyzEXYZ*]/;
	var regExpNum = /[0-9*]/;

	if (!regExpAlpha.test(direction)) {
		return res.send("Direction is incorrect! Must be: x, y, z, e");
	}

	if (!regExpNum.test(distance)) {
		return res.send("Distance is incorrect! Must be an integer.");
	}

	if(pronsole) {
		console.log('-- move forward --');
		pronsole.stdin.write('move ' + direction + ' ' + distance + '\n');
		return res.send('move ' + direction + ' ' + distance);
	} 

	return res.send('Error! Pronsole object is not defined.');
	
});


// == /bedtemp/..
app.post('/bedtemp/:temp', function (req, res) {
	var temp = req.params.temp; 

	var regExpAlpha = /(off)|(abs)|(pla)/;
	var regExpNum = /[0-9*]/;

	if(regExpAlpha.test(temp) || regExpNum.test(temp)) {
		if(pronsole) {
			pronsole.stdin.write('bedtemp ' + temp + '\n');
			console.log('-- set bed temperature on: ' + temp + ' --');
			return res.send('bedtemp ' + temp + '\n');
		} 

		return res.send('Error! Pronsole object is not defined.');
	} else {
		return res.send("Temperature is incorrect! Must be: abs, pla, off or integer's value");
	}
	
});


// == /settemp/..
app.post('/settemp/:temp', function (req, res) {
	var temp = req.params.temp; 

	var regExpAlpha = /(off)|(abs)|(pla)/;
	var regExpNum = /[0-9*]/;

	if(regExpAlpha.test(temp) || regExpNum.test(temp)) {
		if(pronsole) {
			pronsole.stdin.write('settemp ' + temp + '\n');
			console.log('-- set hotendtemp temperature on: ' + temp + ' --');
			return res.send('settemp ' + temp + '\n');
		} 

		return res.send('Error! Pronsole object is not defined.');
	} else {
		return res.send("Temperature is incorrect! Must be: abs, pla, off or integer's value");
	}
});

// == /home/..
app.post('/home/:axis', function (req, res) {
	var axis = req.params.axis;
	var regExpAlpha = /[exyzEXYZ*]/;

	if (!regExpAlpha.test(axis)) {
		return res.send("axis are incorrect! Must be from: x, y, z, e");
	}
	
	if(pronsole) {
		console.log('-- home ' + axis + ' --');
		pronsole.stdin.write('home ' + axis + '\n');
		return res.send('home ' + axis);
	} 

	return res.send('Error! Pronsole object is not defined.');
});

// == /extrude/../..
app.post('/extrude/:dist/:acc?', function (req, res) {
	var distance = req.params.dist; 
	var acceleration = req.params.acc;

	var regExpAlpha = /[exyzEXYZ*]/;
	var regExpNum = /[0-9*]/;

	if (!regExpNum.test(distance)) {
		return res.send("Distance is incorrect! Must be an integer.");
	}

	if (typeof(acceleration) !== 'undefined') {
		if (!regExpNum.test(acceleration)) {
			return res.send("Acceleration is incorrect! Must be: x, y, z, e");
		}
	} else {
		acceleration = '';
	}

	if(pronsole) {
		pronsole.stdin.write('extrude ' + distance + ' ' + acceleration + '\n');
		console.log('-- extrude ' + distance + ' ' + acceleration + ' --');
		return res.send('extrude ' + distance + ' ' + acceleration);
	} 

	return res.send('Error! Pronsole object is not defined.');
	
});

// == /rewerse/../..
app.post('/reverse/:dist/:acc?', function (req, res) {
	var distance = req.params.dist; 
	var acceleration = req.params.acc;

	var regExpAlpha = /[exyzEXYZ*]/;
	var regExpNum = /[0-9*]/;

	if (!regExpNum.test(distance)) {
		return res.send("Distance is incorrect! Must be an integer.");
	}

	if (acceleration) {
		if (!regExpNum.test(acceleration)) {
			return res.send("Acceleration is incorrect! Must be: x, y, z, e");
		}
	} else {
		acceleration = '';
	}

	if(pronsole) {
		pronsole.stdin.write('reverse ' + distance + ' ' + acceleration + '\n');
		console.log('-- reverse ' + distance + ' ' + acceleration + ' --');
		return res.send('reverse ' + distance + ' ' + acceleration);
	} 

	return res.send('Error! Pronsole object is not defined.');
	
});



app.post('/upload', jsonParser, function(req, res) {
    if (!req.body) return res.sendStatus(400);

    var file = req.body.name;
	var b64 = req.body.b64;
	var path = req.body.path;

	var regExpAlpha = /[a-zA-Z0-9*]/;


	var b = new Buffer(b64, 'base64')
	var gcode = b.toString();

	// fs.writeFile(path + file + ".gcode", gcode, function(err) {
	fs.writeFile("/home/pi/rrwi/tmp/" + file + ".gcode", gcode, function(err) {
	    if(err) {
	        return res.send(err);
	    }
	}); 

	res.sendStatus(200);
});

// == /print
app.post('/print/:name', function (req, res) {
	var file = req.params.name;
    pronsole.stdin.write( 'load /home/pi/rrwi/tmp/' + file + '.gcode\n' );
    pronsole.stdin.write( 'print \n' );

	return res.send('sed.');
});

// == /sdprint/..
app.post('/sdprint/:file', function (req, res) {
	var file = req.params.file;
	var regExpAlpha = /[exyzEXYZ*]/;

	if (!regExpAlpha.test(file)) {
		return res.send("file are incorrect! Must be from: x, y, z, e");
	}
	
	if(pronsole) {
		console.log('-- sdprint ' + file + ' --');
		pronsole.stdin.write('sdprint ' + file + '\n');
		return res.send('sdprint ' + file);
	} 

	return res.send('Error! Pronsole object is not defined.');
	
});




// **** Pronsole connection ****
console.log('pronsole.py is spawned, waiting 3 seconds and sending connect...');
setTimeout( function(){
  //calling connect without params here (todo add ttyUSB etc, but hey the defaults work just fine now ;)
  pronsole.stdin.write('connect\n');
}, 3000 );

// //console.log('pronsole.py is spawned, waiting 3 seconds and sending monitor...');
// //setTimeout( function(){
//   //calling connect without params here (todo add ttyUSB etc, but hey the defaults work just fine now ;)
// //  pronsole.stdin.write('monitor\n'); //cool this just works like we want -> need some ajax though to feed it back to the browser...
// //}, 3000 );



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
