var express = require('express');
var router = express.Router();

router.get('/', function (req, res) {
	if (typeof(pronsole) !== 'undefined') {
		pronsole.stdin.write('off \n');
		console.log('-- off --');
		res.send('off\n');
	} 

	res.send('Error! Pronsole object is not defined.');
});

module.exports = router;