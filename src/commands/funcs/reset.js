/**
 * Command to receive temp info from printer
 */
module.exports = (pronsole) => (params) => {
    pronsole.stdin.write('reset \n');
};
