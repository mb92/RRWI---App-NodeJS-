var express = require('express');
var router = express.Router();

router.post('/:temp', function (req, res) {
	var temp = req.params.dir; 

	var regExpAlpha = /(off)|(abs)|(pla)/;
	var regExpNum = /[0-9*]/;

	if(!regExpAlpha.test(temp)) {
		res.send('asd');
	}


	if (!regExpAlpha.test(temp) && !regExpNum.test(temp)) {
		res.send("Temperature is incorrect! Must be: abs, pla, off or integer's value");
	}
	


	if (typeof(pronsole) !== 'undefined') {
		console.log('-- move forward --');
		pronsole.stdin.write('bedtemp ' + temp + '\n');
		res.send('bedtemp ' + temp + '\n');
	} 

	res.send('Error! Pronsole object is not defined.');
	
});

module.exports = router;