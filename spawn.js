// var pronsole = null;

var pronsole = function () { 
	if(pronsole) { 
		return pronsole;
	} else {
		var pronsole = spawn('python', ['/home/pi/printrun/pronsole.py','']); 
	return pronsole; 
	}
}

module.exports = pronsole;