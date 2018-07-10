/**
 * Command to moving head and bed
 * @param {*} pronsole 
 * @param {*} params { drirection distance }
 */
module.exports = (pronsole) => (params) => {
    pronsole.stdin.write(`move ${params.direction} ${params.distance} \n`);
};
