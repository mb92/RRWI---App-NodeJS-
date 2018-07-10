/**
 * Command to moving head and bed
 */
module.exports = (pronsole) => (params) => {
    pronsole.stdin.write(`move ${params.direction} ${params.distance} \n`);
};
