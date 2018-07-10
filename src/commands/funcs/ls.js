/**
 * Command run linux command in home dir
 */
module.exports = (pronsole) => (params) => {
    runCommand('ls', '', '/home/pi/' );
};
