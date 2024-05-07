/**
 * @程序员资源库 coderlibs出品
 **/
// 统一异常处理
module.exports = (app) => {
    app.use(async (ctx, next) => {
        ctx.msg = "" // 通用错误信息返回
        ctx.errMsg = "" // 指定400类型的错误信息返回
        let status = 0;
        try{
            await next();
            if(ctx.errMsg){
                ctx.status = 400
                ctx.msg = ctx.errMsg
            }
            status = ctx.status;
        }catch(err){
            status = 500;
            console.error(`url: ${ctx.request.url} 访问报错:`,err)
        }
        if(status >= 400){
            switch(status){
                case 400:
                    ctx.body = {
                        Message:ctx.msg?ctx.msg:"请求错误,请查看参数是否正确。",
                        Code:400
                    };
                    break;
                case 401:
                    ctx.body = {
                        Message:ctx.msg?ctx.msg:"您的身份未验证,请先登录！",
                        Code:401
                    };
                    break;
                case 403:
                    ctx.body = {
                        Message:ctx.msg?ctx.msg:"您的身份不明,服务器拒绝请求。",
                        Code:403
                    };
                    break;
                case 404:
                    ctx.body = {
                        Message:ctx.msg?ctx.msg:"抱歉,没有对应的api",
                        Code:404
                    };
                    break;
                case 406:
                    ctx.body = {
                        Message:ctx.msg?ctx.msg:"token失效,请重新登录！",
                        Code:406
                    }
                    break;
                case 500:
                    ctx.body = {
                        Message:ctx.msg?ctx.msg:"服务器内部错误",
                        Code:500
                    };
                    break;
                default:
                    ctx.body = {
                        Message:ctx.msg?ctx.msg:"服务器故障",
                        Code:501
                    };
                    break;
            }
            // 输出错误日志
            if(ctx.status != 500){
                console.warn("url:"+ctx.request.url+" 状态码: "+status,ctx);
            }
        }
        ctx.response.status = status;
    });
}