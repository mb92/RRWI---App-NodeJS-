var express = require('express');
var router = express.Router();

router.post('/:file', function (req, res) {
	var file = req.params.file;
	var regExpAlpha = /[exyzEXYZ*]/;

	if (!regExpAlpha.test(file)) {
		res.send("file are incorrect! Must be from: x, y, z, e");
	}
	
	if (typeof(pronsole) !== 'undefined') {
		console.log('-- home ' + file + ' --');
		pronsole.stdin.write('home ' + file + '\n');
		res.send('home ' + file);
	} 

	res.send('Error! Pronsole object is not defined.');
	
});


module.exports = router;