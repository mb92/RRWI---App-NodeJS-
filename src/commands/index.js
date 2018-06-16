const funcs = require('./funcs');

module.exports = Object.keys(funcs).map(key => [ key, funcs[key] ])