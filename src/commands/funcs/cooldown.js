/**
 * Command to receive temp info from printer
 */
module.exports = (pronsole) => (params) => {
	pronsole.stdin.write('settemp 0 \n');
	pronsole.stdin.write('bedtemp 0 \n');

};
