const Router = require('koa-router');
const router = new Router();

router.get('/', async (ctx) => {
    let data = await new Promise((resolve, reject) => {
        resolve("恭喜您，服务器已经启动！")
    })
    ctx.body = data;
})

module.exports = router