/**
 * Command for pause printing process
 */
module.exports = (pronsole) => (params) => {
    pronsole.stdin.write('pause \n');
};
