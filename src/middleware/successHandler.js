/**
 * @程序员资源库 coderlibs出品
 **/
// 请求成功统一格式返回
const { v1: uuidv1 } = require('uuid');
module.exports = (app) => {
    app.use(async (ctx, next) => {
        ctx.Relust = null  // 适用于只有一个参数的返回,但是不要用于布尔值的返回
        ctx.send = {}   // 适用于多条数据,以对象的形式返回
        let status = 0;
        try{
            await next();
            if(ctx.Relust || Object.keys(ctx.send).length !== 0){
                ctx.status = 200
            }
            status = ctx.status;
        }catch(err){
            status = 500;
            console.error(`url: ${ctx.request.url} 访问报错:`,err)
        }
        if(status == 200){
            let RelustId = uuidv1()
            let res = Object.keys(ctx.send).length === 0?{
                Relust:ctx.Relust?ctx.Relust:"请求成功",
                RelustId
            }:{ RelustId,...ctx.send }
            // 检测ctx.body是否是对象 如果不是对象则转换为对象
            let body = Object.prototype.toString.call(ctx.body) === '[object Object]'?ctx.body:ctx.body&&{data:ctx.body};
            if(body && !body.RelustId) body.RelustId = RelustId
            ctx.body = body?body:res;
            
            // 请求成功，输出日志
            if(ctx.status != 500 && !ctx.noLogger){
                console.log("url:"+ctx.request.url+" 状态码: "+status,ctx);
            }
        }
        ctx.response.status = status;
    });
}