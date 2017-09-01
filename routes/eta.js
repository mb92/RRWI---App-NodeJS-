var express = require('express');
var router = express.Router();

router.get('/', function (req, res) {
	if (typeof(pronsole) !== 'undefined') {
		pronsole.stdin.write('eta \n');
		console.log('-- eta --');
		res.send('eta\n');
	} 

	res.send('Error! Pronsole object is not defined.');
});

module.exports = router;