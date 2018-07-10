/**
 * Command to resume printing process */

module.exports = (pronsole) => (params) => {
    pronsole.stdin.write('resume \n');
};
