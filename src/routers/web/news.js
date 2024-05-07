const Router = require('koa-router');
const news = new Router();
const NewsController = require('@controller/web/news');

news.get('/', async (ctx) => {
    let data = await new Promise((resolve, reject) => {
        resolve("news")
    })
    ctx.body = data;
})
// 查询文章列表
news.post('/passApi/getNewsList', async (ctx,next)=>{
    await NewsController.getNewsList(ctx, next)
})
module.exports = news;
