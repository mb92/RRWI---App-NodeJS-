var express = require('express');
var router = express.Router();

router.get('/', function (req, res) {
	if (typeof(pronsole) !== 'undefined') {
		pronsole.stdin.write('monitor \n');
		console.log('-- monitor --');
		res.send('monitor\n');
	} 

	res.send('Error! Pronsole object is not defined.');
});

module.exports = router;