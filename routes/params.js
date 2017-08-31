var express = require('express');
var router = express.Router();

router.post('/:p1/:p2', function (req, res) {
	console.log(req.params.p1);
	res.send(req.params);
});

module.exports = router;