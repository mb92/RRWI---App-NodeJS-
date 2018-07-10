/**
 * Command to cooldown ale hating source (hotend and bed)
 */
module.exports = (pronsole) => (params) => {
	pronsole.stdin.write('settemp 0 \n');
	pronsole.stdin.write('bedtemp 0 \n');

};
