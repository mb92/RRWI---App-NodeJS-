var express = require('express');
var router = express.Router();

router.post('/:dir/:dist', function (req, res) {
	var direction = req.params.dir;
	var distance = req.params.dist;

	console.log('-- move forward ==');
	pronsole.stdin.write('move ' + direction + ' ' + distance + '\n');
	res.send('move ' + direction + ' ' + distance);
});

module.exports = router;