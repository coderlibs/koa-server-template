const Koa = require('koa');
const app = new Koa();
const router = require("./src/routers/index.js");
app.use(router.routes(), router.allowedMethods()); // 启用路由，允许网络请求
app.listen(5050, () => {
    console.debug('Server is running at http://localhost:' + 5050);
});