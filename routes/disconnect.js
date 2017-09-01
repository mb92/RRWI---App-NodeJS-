var express = require('express');
var router = express.Router();

router.get('/', function (req, res) {
	if (typeof(pronsole) !== 'undefined') {
		pronsole.stdin.write('disconnect \n');
		console.log('-- disconnect --');
		res.send('disconnect\n');
	} 

	res.send('Error! Pronsole object is not defined.');
});

module.exports = router;