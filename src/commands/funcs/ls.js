/**
 * Command return list of file from sd card
 */
module.exports = (pronsole) => (params) => {
    runCommand('ls', '', '/home/pi/' );
};
