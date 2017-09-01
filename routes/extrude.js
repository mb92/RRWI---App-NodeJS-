var express = require('express');
var router = express.Router();

router.post('/:dist/:acc?', function (req, res) {
	var distance = req.params.dist; 
	var acceleration = req.params.acc;

	var regExpAlpha = /[exyzEXYZ*]/;
	var regExpNum = /[0-9*]/;

	if (!regExpNum.test(distance)) {
		res.send("Distance is incorrect! Must be an integer.");
	}

	if (typeof(acceleration) !== 'undefined') {
		if (!regExpNum.test(acceleration)) {
			res.send("Acceleration is incorrect! Must be: x, y, z, e");
		}
	} else {
		acceleration = '';
	}

	if (typeof(pronsole) !== 'undefined') {
		pronsole.stdin.write('extrude ' + distance + ' ' + acceleration + '\n');
		console.log('-- extrude ' + distance + ' ' + acceleration + ' --');
		res.send('extrude ' + distance + ' ' + acceleration);
	} 

	res.send('Error! Pronsole object is not defined.');
	
});

module.exports = router;