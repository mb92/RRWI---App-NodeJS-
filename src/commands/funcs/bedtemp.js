/**
 * Command to send working temperature value for bed
 * @param {*} pronsole 
 * @param {*} params { temp }
 */
module.exports = (pronsole) => (params) => {
    pronsole.stdin.write(`bedtemp ${params.temp}\n`);
};
