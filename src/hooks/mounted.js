const successHandler = require('@/middleware/successHandler.js');
const { koaBody } = require('koa-body');
const path = require('path');
function getClientIP(req) {
  return req.headers['x-forwarded-for'] || // 判断是否有反向代理 IP
      req.connection.remoteAddress || // 判断 connection 的远程 IP
      req.socket.remoteAddress || // 判断后端的 socket 的 IP
      req.connection.socket.remoteAddress;
};
module.exports = function(app){
    // 配置文件上传
    app.use(koaBody({
        multipart: true, // 支持多文件上传
        formidable: {
          // uploadDir: path.join(__dirname, "../../../upload/"), // 设置文件上传目录
          keepExtensions: true, // 保持文件的后缀
          maxFieldsSize: 10 * 1024 * 1024, // 文件上传大小限制,最大10M
          onError: (error) => {
            app.status = 400;
            logger.error(error);
            // 这里可以定义自己的返回内容
            app.body = { code: 400, msg: "上传失败", data: {} };
            return;
          },
        }
    }));
    // 配置ip地址中间件
    app.use(async (ctx, next) => {
        const ip = getClientIP(ctx.req) || ctx.request.ip;
        const ips = ip.split(','); // 将多个IP地址拆分为数组
        const ip_address = ips[ips.length - 1].trim(); // 获取数组的最后一个元素作为客户端的IP地址
        // 将用户ip地址挂载到全局
        ctx.state.ip = ip_address;
        await next();
    });
    // 接口成功处理
    successHandler(app);
}