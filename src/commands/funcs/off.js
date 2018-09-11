/**
 * Command to broken connection - off transmision */
module.exports = (pronsole) => (params) => {
    pronsole.stdin.write('off \n');
};
