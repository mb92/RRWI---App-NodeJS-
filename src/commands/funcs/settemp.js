/**
 * Command to send working temperature value
 * @param {*} pronsole 
 * @param {*} params 
 */
module.exports = (pronsole) => (params) => {
    pronsole.stdin.write(`settemp ${params.temp}\n`);
    pronsole.stdin.write(`bedtemp ${params.temp}\n`);
};
