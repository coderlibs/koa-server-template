const Router = require('koa-router');
const article = new Router();
const ArticleController = require('@controller/web/article');

article.get('/', async (ctx) => {
    let data = await new Promise((resolve, reject) => {
        resolve("article")
    })
    ctx.body = data;
})
// 查询文章列表
article.post('/passApi/getList', async (ctx,next)=>{
    await ArticleController.getList(ctx, next)
})
// 根据id查询文章
article.get('/passApi/getArticle', async (ctx,next)=>{
    await ArticleController.getArticle(ctx, next)
})
// 发布文章
article.post('/publish', async (ctx,next)=>{
    await ArticleController.publishArticle(ctx, next)
})
module.exports = article;
