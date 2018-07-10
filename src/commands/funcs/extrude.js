/**
 * Command to extrude filament
 * @param {*} pronsole 
 * @param {*} params {distance, acceleration}
 */
module.exports = (pronsole) => (params) => {
    pronsole.stdin.write(`extrude ${params.distance} ${params.acceleration} \n`);
};