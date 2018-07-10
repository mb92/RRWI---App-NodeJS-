/**
 * Command closing connection with printer
 */
module.exports = (pronsole) => (params) => {
    pronsole.stdin.write('disconnect \n');
};
		



