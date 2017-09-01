var express = require('express');
var router = express.Router();

router.get('/', function (req, res) {
	if (typeof(pronsole) !== 'undefined') {
		pronsole.stdin.write('resume \n');
		console.log('-- resume --');
		res.send('resume\n');
	} 

	res.send('Error! Pronsole object is not defined.');
});

module.exports = router;