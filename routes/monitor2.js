var express = require('express');
var router = express.Router();

router.get('/', function (req, res) {
	if (typeof(pronsole) !== 'undefined') {
		pronsole.stdin.write('monitor2 \n');
		console.log('-- monitor2 --');
		res.send('monitor2\n');
	} 

	res.send('Error! Pronsole object is not defined.');
});

module.exports = router;