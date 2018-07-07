/**
 * Command to receive info about the printing process
 */
module.exports = (pronsole) => (params) => {
    pronsole.stdin.write('monitor \n');
};


