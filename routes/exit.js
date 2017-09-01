var express = require('express');
var router = express.Router();

router.get('/', function (req, res) {
	if (typeof(pronsole) !== 'undefined') {
		pronsole.stdin.write('exit \n');
		console.log('-- exit --');
		res.send('exit\n');
	} 

	res.send('Error! Pronsole object is not defined.');
});

module.exports = router;