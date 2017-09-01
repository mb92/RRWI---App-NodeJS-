var express = require('express');
var router = express.Router();

router.get('/', function (req, res) {
	if (typeof(pronsole) !== 'undefined') {
		pronsole.stdin.write('reset \n');
		console.log('-- reset --');
		res.send('reset\n');
	} 

	res.send('Error! Pronsole object is not defined.');
});

module.exports = router;