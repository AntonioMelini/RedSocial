//const store = require('../../../store/dummy');
const storeMysql= require('../../../../store/remote-mysql');
const ctrl = require('./controller');

module.exports = ctrl(storeMysql); 