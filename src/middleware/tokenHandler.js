/**
 * @程序员资源库 coderlibs出品
 **/
const koaJwt = require('koa-jwt') // 路由权限控制
const { tokenInfo, domains } = require("@/config")
const { setCookies } = require("@/utils/setCookies");
// jwt
module.exports = (app) => {
// token 失效返回 401
app.use(function(ctx, next){
    let isHomeStation = ctx.state.__HOST__&&ctx.state.__HOST__.includes(domains.CookieDomain) || false
    let ortherApi = ['/test','/public']
    let hasOrtherApi = ortherApi.some(el=>ctx.request.url.startsWith(el))
    return next().then((res)=>{
        if (hasOrtherApi) {
            return;  // 不作处理
        }
        if(!isHomeStation && /json/i.test(ctx.response.header['content-type'])){
            ctx.status = 403; // 身份不明接口访问
        }
    }).catch((err) => {
        if (401 == err.statusCode ) { // token 失效
            if(isHomeStation){
                setCookies(ctx, null, null, null);
                return ctx.status = ctx.request.url !== '/server/main/getUserInfo' ? 406 : 401;  //  判断是否是登录失效的情况
            } 
            ctx.status = 403; // 身份不明接口访问
        } 
        else {
            throw err;
        }
    });
});
// 免验证
app.use(koaJwt({secret:tokenInfo.TokenSecret,cookie:tokenInfo.TokenName}).unless({
    path: [/^\/test/,/^\/public/,/^\/assets/,/.*passApi.*?(?=\b)/,/^\/404/] // 除了这些请求地址，其他的URL都需要验证
}))
}