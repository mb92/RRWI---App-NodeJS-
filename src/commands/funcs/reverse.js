/**
 * Command to reverse of filament in extruder
 * @param {*} pronsole 
 * @param {*} params {distance, acceleration} 
 */
module.exports = (pronsole) => (params) => {
    pronsole.stdin.write('reverse ${params.distance} ${params.acceleration} \n');
};