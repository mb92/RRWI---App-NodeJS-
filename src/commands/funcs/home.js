/**
 * Command to send homeing command for select axis
 * @param {*} pronsole 
 * @param {*} params 
 */
module.exports = (pronsole) => (params) => {

       pronsole.stdin.write('home ' + params + '\n');

};
