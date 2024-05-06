const Router = require('koa-router');
const IndexController  = require('@controller/main/index');
const login = require("./login")
const main = new Router();

main.get('/', async (ctx)=>{
    let data = await new Promise((resolve, reject) => {
        resolve("main")
    })
    ctx.body = data;
})

// 登录注册
main.use('', login.routes(), login.allowedMethods());

// 获取登录用户信息
main.get('/getUserInfo',async(ctx,next)=>{
    await IndexController.getUserInfoController(ctx,next)
})

module.exports = main;