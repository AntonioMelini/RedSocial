//const store = require('../../../store/dummy');
const storeMysql= require('../../../../store/remote-mysql');
const ctrl = require('./controller');

let cache= require('../../../../store/remote-cache')

module.exports = ctrl(storeMysql,cache); 