var express = require('express');
var router = express.Router();

router.post('/:dir/:dist', function (req, res) {
	var direction = req.params.dir;
	var distance = req.params.dist; 

	// console.log('-- move forward --');
	//exyzEXYZ*0-9]

	var regExpAlpha = /[exyzEXYZ*]/;
	var regExpNum = /[0-9*]/;

	if (!regExpAlpha.test(direction)) {
		res.send("Direction is incorrect! Must be: x, y, z, e");
	}

	if (!regExpNum.test(distance)) {
		res.send("Distance is incorrect! Must be an integer.");
	}

	if (typeof(pronsole) !== 'undefined') {
		console.log('-- move forward --');
		pronsole.stdin.write('move ' + direction + ' ' + distance + '\n');
		res.send('move ' + direction + ' ' + distance);
	} 

	res.send('Error! Pronsole object is not defined.');
	
});

module.exports = router;