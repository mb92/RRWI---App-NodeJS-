/**
 * Command to receive temp info from printer
 */
module.exports = (pronsole) => (params) => {
    pronsole.stdin.write(`connect ${params.port} ${params.baud} \n`);
};

		
