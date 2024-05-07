const config = require("@/config")
const health = require("@/middleware/healthHandler")
const errorHandler = require('@/middleware/errorHandler.js');
const { logger, accessLogger } = require('@/utils/log/logger');
const { repeatLog } = require('@/utils/log/overLog.js');
const loggerHandler = require('@/middleware/loggerHandler')
const tokenHandler = require("@/middleware/tokenHandler");
const { nologgerList } = require("@/config");
const compress = require('koa-compress')
const cors = require('koa2-cors');
module.exports = function(app){
    // 配置跨域
    app.use(cors({
        origin: (ctx) => {
          const requestedOrigin = ctx.request.header.origin;
          if (requestedOrigin && requestedOrigin.includes(`${config.domains.CookieDomain}`)) {
            return requestedOrigin;
          }
          return null; // 或返回其他允许的域名和端口
        },
        exposeHeaders: ['WWW-Authenticate', 'Server-Authorization'], // 设置获取其他自定义字段
        maxAge: 5, // 指定本次预检请求的有效期，单位为秒。
        credentials: true, // 是否允许发送Cookie
        allowMethods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'], // 设置所允许的HTTP请求方法
        allowHeaders: ['Content-Type', 'Authorization', 'Accept', 'X-Requested-With', 'Access-Token', 'web_token', 'x-domain-for'], // 设置服务器支持的所有头信息字段
    }));
    app.use(compress({
        threshold: 10240, // 响应体大于 10240 字节（即大于 10KB）时才会进行压缩
        filter: (contentType) => {
            return /json/i.test(contentType);  // 仅对请求格式为json的数据进行压缩
        }
    }));
    // 提前健康检查
    app.use(health.routes())
    // 将log和logger代理到cxt上下文中
    app.use(loggerHandler())
    // ctx挂载配置
    app.use(async (ctx, next) => {
        ctx.develop = config.develop // ctx挂载development配置
        ctx.state.domains = config.domains // ctx挂载domains配置
        ctx.noLogger = nologgerList.some(el => ctx.request.url.includes(el))  // 接口是否符合日志免打印
        ctx.state.__HOST__ = ctx.request.headers['x-domain-for']; // 自定义请求头，用于判断是否属于规定域名请求
        await next()
    })
    // 全局异常捕获，错误处理
    errorHandler(app)
    // token拦截校验
    tokenHandler(app)
    // 访问级别的日志处理，记录用户的所有请求
    app.use(accessLogger());
    // 记录全局状态下的error,也可记录接口请求当中的错误处理
    app.on('error', err => {
        logger.error(err);
    });
    // 重写console方法，代理到logger
    repeatLog(logger)
}