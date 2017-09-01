var express = require('express');
var router = express.Router();

router.get('/', function (req, res) {
	if (typeof(pronsole) !== 'undefined') {
		pronsole.stdin.write('ls \n');
		console.log('-- ls --');
		res.send('ls\n');
	} 

	res.send('Error! Pronsole object is not defined.');
});

module.exports = router;