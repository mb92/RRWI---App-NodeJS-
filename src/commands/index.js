const funcs = require('./funcs');

module.exports = (pronsole) => Object.keys(funcs).map(key => [ key, funcs[key](pronsole) ])
// module.exports = (pronsole) => Object.assign({}, Object.keys(funcs).map(key => ({ key: funcs[key](pronsole) }))