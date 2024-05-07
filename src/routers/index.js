const Router = require('koa-router');
const router = new Router();

// api路由模块注册
const main = require("./main/index.js");
const web = require("./web/index.js");
router.use('/main', main.routes(), main.allowedMethods());
router.use('/web', web.routes(), web.allowedMethods());
module.exports = router