/**
 * Command to send working temperature value
 * @param {*} pronsole 
 * @param {*} params 
 */
module.exports = (pronsole) => (params) => {
    pronsole.stdin.write(`bedtemp ${params.temp}\n`);
};
