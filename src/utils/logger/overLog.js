/**
 * @程序员资源库 coderlibs出品
 **/
/**
 * 创建日志代理方法
 * @param logLevel 日志级别
 * @param logger 日志对象
 * @return {function}
 */
/**
 * 打印占位符
 * %s 字符串(整数、小数也可以打印)
 * %d 整数
 * %f 小数
 * %o || %O 对象
 * %c 后面字符串的样
 */

exports.repeatLog = function(logger){
    function createLogProxy (logLevel, logger) {
       return (...param) => {
           logger[logLevel](...param);
       };
   }
   console.log = createLogProxy('debug', logger);
   console.info = createLogProxy('info', logger);
   console.warn = createLogProxy('warn', logger);
   console.error = createLogProxy('error', logger);
}