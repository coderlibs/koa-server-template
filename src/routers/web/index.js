const Router = require('koa-router');
const web = new Router();
const news = require("./news.js");
const IP2Region = require('ip2region').default;
web.use('/news', news.routes(), news.allowedMethods());

web.get('/', async (ctx) => {
    let data = await new Promise((resolve, reject) => {
        resolve("web")
    })
    ctx.body = data;
})

// 获取客户端IP
web.get('/getIP', async (ctx) => {
    let ip = ctx.state.ip;
    ctx.body = ip;
})
// 获取当前城市
web.get('/getCity', async (ctx) => {
    const Region = new IP2Region();
    const location = Region.search(ctx.state.ip);
    if(location){
        ctx.body = location.city;
    }else{
        ctx.status = 400
    }
})
module.exports = web;