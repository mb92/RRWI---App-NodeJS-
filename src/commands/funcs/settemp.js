/**
 * Command to send working temperature value for hotend
 * @param {*} pronsole 
 * @param {*} params 
 */
module.exports = (pronsole) => (params) => {
    pronsole.stdin.write(`settemp ${params.temp}\n`);
};
