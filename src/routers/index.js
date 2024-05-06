const Router = require('koa-router');
const router = new Router();

router.get('/', async (ctx) => {
    let data = await new Promise((resolve, reject) => {
        resolve("server")
    })
    ctx.body = data;
})

module.exports = router