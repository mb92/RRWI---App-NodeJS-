var express = require('express');
var router = express.Router();

router.post('/:axis', function (req, res) {
	var axis = req.params.axis;
	var regExpAlpha = /[exyzEXYZ*]/;

	if (!regExpAlpha.test(axis)) {
		res.send("axis are incorrect! Must be from: x, y, z, e");
	}
	
	if(pronsole) {
		console.log('-- home ' + axis + ' --');
		pronsole.stdin.write('home ' + axis + '\n');
		res.send('home ' + axis);
	} 

	res.send('Error! Pronsole object is not defined.');
	
});

module.exports = router;