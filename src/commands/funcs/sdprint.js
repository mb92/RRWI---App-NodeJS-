/**
 * Command choose file from sd and run printing process
 */
module.exports = (pronsole) => (params) => {
    pronsole.stdin.write(`sdprint ${params.file} \n`);
};
