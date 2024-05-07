/**
 * @程序员资源库 coderlibs出品
 **/
 const { logger } = require('@/utils/log/logger');
 const methods = ["trace", "debug", "info", "warn", "error", "fatal", "mark"]
  
 module.exports = () => {
   const contextLogger = {}
   
   return async (ctx, next) => {
        // 记录请求开始的时间
     const start = Date.now()
      // 循环methods将所有方法挂载到ctx 上
     methods.forEach((method, i) => {
        contextLogger[method] = (message) => {
          logger[method](message)
        }
     })
     ctx.log = contextLogger;
     ctx.logger = contextLogger;
  
     await next()
     // 记录完成的时间 作差 计算响应时间
     const responseTime = Date.now() - start;
     if(ctx.status != 500 && !ctx.noLogger){
        logger.trace(`url: ${ctx.request.url} 响应时间为: ${responseTime/1000}s`);
     }
   }
 }