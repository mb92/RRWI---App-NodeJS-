var express = require('express');
var router = express.Router();

router.post('/:temp', function (req, res) {
	var temp = req.params.temp; 

	var regExpAlpha = /(off)|(abs)|(pla)/;
	var regExpNum = /[0-9*]/;

	if(regExpAlpha.test(temp) || regExpNum.test(temp)) {
		if (typeof(pronsole) !== 'undefined') {
			pronsole.stdin.write('settemp ' + temp + '\n');
			console.log('-- set hotendtemp temperature on: ' + temp + ' --');
			res.send('settemp ' + temp + '\n');
		} 

		res.send('Error! Pronsole object is not defined.');
	} else {
		res.send("Temperature is incorrect! Must be: abs, pla, off or integer's value");
	}
	
});

module.exports = router;