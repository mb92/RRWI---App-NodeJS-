/**
 * Command to connection with custom settings of connection
 * @param {*} pronsole 
 * @param {*} params { port, baud }
 */
module.exports = (pronsole) => (params) => {
    pronsole.stdin.write(`connect ${params.port} ${params.baud} \n`);
};

		
