/**
 * Command to receive temp info from printer
 */
module.exports = (pronsole) => (params) => {
    runCommand('ls', '', '/home/pi/printrun/' );
};
