const funcs = require('./funcs');

module.exports = (pronsole) => Object.keys(funcs).map(key => [ key, funcs[key](pronsole) ])