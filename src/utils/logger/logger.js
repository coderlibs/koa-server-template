/**
 * @程序员资源库 coderlibs出品
 **/
const path = require('path');
const log4js = require('koa-log4');

log4js.configure({
 appenders: {
  access: {
   type: 'dateFile',
   pattern: '-yyyy-MM-dd.log', //生成文件的规则
   filename: path.join('logs/', 'access.log') //生成文件名
  },
  application: {
   type: 'dateFile',
   pattern: '-yyyy-MM-dd.log',
   filename: path.join('logs/', 'application.log')
  },
  out: {
   type: 'console'
  }
 },
 categories: {
  default: { appenders: [ 'out' ], level: 'all' },
  access: { appenders: [ 'access' ], level: 'all' },
  application: { appenders: [ 'application' ], level: 'all'}
 }
});

exports.logger = log4js.getLogger('application'); //记录所有应用级别的日志
exports.accessLogger = () => log4js.koaLogger(log4js.getLogger('access')); //记录所有访问级别的日志