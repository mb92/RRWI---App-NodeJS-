var express = require('express');
var router = express.Router();

router.get('/', function (req, res) {
	if (typeof(pronsole) !== 'undefined') {
		pronsole.stdin.write('print \n');
		console.log('-- print --');
		res.send('print\n');
	} 

	res.send('Error! Pronsole object is not defined.');
});

module.exports = router;