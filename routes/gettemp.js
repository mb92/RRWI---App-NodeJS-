var express = require('express');
var router = express.Router();

router.get('/', function (req, res) {
	if (typeof(pronsole) !== 'undefined') {
		pronsole.stdin.write('gettemp \n');
		console.log('-- gettemp --');
		res.send('gettemp\n');
	} 

	res.send('Error! Pronsole object is not defined.');
});

module.exports = router;