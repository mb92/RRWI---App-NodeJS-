var express = require('express');
var router = express.Router();

// function checkInt(value) {
// 	Number.isInteger(value);	
// 	if (!check) {
// 		res.send("Params must be integer");		
// 		return false;
// 	} 
// 	// return true;
// }

router.get('/', (req, res) => {
	// checkInt('asd');
	// res.send(check);	
   res.json({ message: 'terddsdfd' });   
});

module.exports = router;