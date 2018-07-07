
// **** Dependencies ****
const express = require('express');        // call express
const bodyParser = require('body-parser');	//call body-parser
const util = require('util');   				//replaces sys
const fs = require('fs'); 					//moving filess
const cors = require('cors');
const spawn = require('child_process').spawn;
const server = require('http').Server;   				//the http server
const Gpio = require('onoff').Gpio;
const socket = require('socket.io');
const path = require('path');

require('colors');


// DEFAULT PARAMS
const port = process.env.PORT || 3000;        // set our port
const CAM = {
    PORT: 4000,
    WIDTH: 480,
    HEIGHT: 320,
    TIMEOUT: 50,
    QUALITY: 10,
}

// START CAM
const camera = spawn('node', [
    path.join(__dirname, 'node_modules/raspberry-pi-mjpeg-server/raspberry-pi-mjpeg-server.js'),
    '-p', CAM.PORT,
    '-w', CAM.WIDTH,
    'l', CAM.HEIGHT,
    '-t', CAM.TIMEOUT,
    '-q', CAM.QUALITY,
])

// APP CONFIGURATION
const app = express();
app.use(cors());
app.options('*', cors());

const http = server(app);
const io = socket(http);

// SOCKET CONFIGURATION
io.on('connection', (socket) => {
    console.log('NEW SOCKET'.green);
    
    socket.emit('pong', 'PONG SRONG');
});


// SPAWN PRONSOLE PROCESS
const pronsole = spawn('python', ['/home/pi/printrun/pronsole.py','']);
pronsole.stdout.setEncoding('utf8');

const parsers = require('./parsers');


pronsole.stdout.on('data', data => {
    const stringData = data.toString('utf8');
    
    // Parsers setup
    
    let preResults = Object.keys(parsers).map(parserName => {
        return parsers[parserName](stringData);
    }).filter(el => el)
    
    // console.log("PRERESULTS".green, preResults);
    
    let results = Object.keys(parsers).map(parserName => {
        return parsers[parserName](stringData)
    }).filter(el => el)
    
    // console.log('parsing results'.yellow, results[0]);
    io.emit('status', results[0]);
    
    // if(results && results.length > 0) {
    //     io.emit('status', results);
    // }
    
    io.emit('console', stringData.replace(/.*00m (.*)/g,""));
});


// Get temp in intervals
const GETTEMP_INTERVAL_TIME = 1000;
const getTempInterval = setInterval(() => {
    commands.gettemp();
}, GETTEMP_INTERVAL_TIME);

let command_output = ''; //this will contain output of commands that we're run with runCommand fuction...
let files = []; //array of files uploaded

//we need to just to interface with pronsole.py that works perfectly !

var turnOn = null;
var turnOff = null;
// var pinState = new Gpio(18, 'out');

var jsonParser = bodyParser.json({limit:'50mb', type:'application/json'});
var urlencodedParser = bodyParser.urlencoded({ extended:true, limit:'50mb', type:'application/x-www-form-urlencoding' });
// //*************************
// 



// Import commands when pronsole object is ready
let commandsList = require('./commands')(pronsole);

console.log('COMMANDS AVAILABLE:'.bgBlue.white);
commandsList.forEach(([name]) => console.log(`- ${name}`.blue))

// COMMANDS LIST TO OBJECT
let commands = {};
commandsList.forEach(([commandName, func]) => { commands[commandName] = func })



// **** Routes for api ****
// =============================================================================
app.get('/', function(req, res) {
    return res.json({ message: 'Welcome in RepRapWebInterface API' });   
});

// Power controll
app.get('/powerStatus', function(req, res) {
    // var st = pinState.readSync();
    // return res.json({ 'message': st });
    var filename = '/home/pi/rrwi/py/power_status.txt';
    fs.readFile(filename, 'utf8', function(err, data) {
        if (err) throw err;
		console.log('OK: ' + filename);
		console.log(data)
		return res.json({ 'message': data });
	});
});

app.get('/turnOn', function(req, res) {
    var turnOn = spawn('python', ['/home/pi/rrwi/py/on.py','']);   
    // res.send("Power ON");
    return res.json({ message: "Power ON"});
});

app.get('/turnOff', function(req, res) {
	pronsole.stdin.write('reset \n');
    var turnOn = spawn('python', ['/home/pi/rrwi/py/off.py','']);
    // res.send("Power OFF");
    return res.json({ message: "Power OFF"});
});

// end: Power Controll

// Camera
app.get('/cameraOn', function(req, res) {
    // res.send("Camera is turn on");
    return res.json({ message: "Camera is turn ON"});
});

app.get('/cameraOff', function(req, res) {
    streaming = null;
    // res.send("Camera is turn off");
    return res.json({ message: "Camera is turn OFF"});
});

// end: Camera




//GET:
// == /exit
app.get('/exit', function (req, res) {
	if(pronsole) {
		pronsole.stdin.write('reset \n');
		pronsole.stdin.write('off \n');
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

// == /print
app.get('/print', function (req, res) {
    // pronsole.stdin.write( 'print \n' );
        commands.print();
	return res.send('Start printing!');
});


// == /print
app.get('/command/:commandname?', function (req, res) {
    console.log("CMD".blue, req.params.commandname);
    pronsole.stdin.write(decodeURI(req.params.commandname) + '\n');
    
	return res.send('OK');
});



var textChunk = null;
// == /gettemp
app.get('/status', function (req, res) {
    res.send('Node RRWI API is running');
});

// == /gettemp
app.get('/gettemp', function (req, res) {
    // For now this way, in future, we will change this to binding method
    console.log(commands.gettemp)
    commands.gettemp();
    res.send(commands.gettemp);
});

// == /monitor
app.get('/monitor', function (req, res) {
	commands.monitor();
	console.log('-- monitor --');
	return res.send('monitor\n');
});

// == /monitor2
app.get('/monitor2', function (req, res) {
	commands.monitor2();
	console.log('-- monitor2 --');
	return res.send('monitor2\n');
});

// == /disconnect
app.get('/disconnect', function (req, res) {
		commands.disconnect();
		console.log('-- disconnect --');
		return res.send('disconnect\n');
});


// //POST:

// == /connect/..
app.post('/connect/:port/:baud', function (req, res) {
	var port = req.params.port; 
	var baud = req.params.baud; 
	var regExpAlpha = /(off)|(abs)|(pla)/;
	var regExpNum = /[0-9*]/;
    
	// if(regExpAlpha.test(temp) || regExpNum.test(temp)) {
    if(pronsole) {
        pronsole.stdin.write('connect ' + port + ' ' + baud + '\n');
        console.log('-- connect: ' + port + ' ' + baud + ' --');
        return res.send('connect ' + port + ' ' + baud + '\n');
    } 
    
    return res.send('Error! Pronsole object is not defined.');
	// } else {
	// 	return res.send("Temperature is incorrect! Must be: abs, pla, off or integer's value");
	// }
});


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
        commands.settemp({ temp: temp })
        //I think pronsole will always be true here
        return res.send('settemp ' + temp + '\n');
		// if(pronsole) {
        
        
		// 	// pronsole.stdin.write('settemp ' + temp + '\n');
		// 	// console.log('-- set hotendtemp temperature on: ' + temp + ' --');
		// } 
        
		// return res.send('Error! Pronsole object is not defined.');
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
    
    //    pronsole.stdin.write('home ' + axis + '\n');
    commands.home(req.params.axis)
    
    return res.send('home ' + axis);    
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
    
	var fileName = "/home/pi/rrwi/tmp/" + file;
    
	// fs.writeFile(path + file + ".gcode", gcode, function(err) {
	fs.writeFile(fileName, gcode, function(err) {
        if(err) {
            return res.send(err);
        } else {
            
            if(pronsole) {
				console.log('-- load ' + fileName + ' --');
				pronsole.stdin.write('load ' + fileName + '\n');
				
			} 
            // return res.send('load ' + fileName);
        }
	}); 
    
	res.sendStatus(200);
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



// pronsole.stdout.on('data', function (data) {
//   console.log( 'pronsole: '+data ); //todo use some ajax to feed it to our browser here...
// });

// pronsole.stderr.on('data', function (data) {
//   console.log('pronsole err: ' + data);
// });

// pronsole.stdout.on('end', function(data) {
//   pronsole.stdout.end();
// } );

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
http.listen(port, () => {
    console.log('Server is running on port: ' + port);
});
