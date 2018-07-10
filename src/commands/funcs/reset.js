/**
 * Command to reset printing
 */
module.exports = (pronsole) => (params) => {
    pronsole.stdin.write('reset \n');
};
