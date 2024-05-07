const moduleAlias = require('module-alias');
moduleAlias.addAliases({
  "@": __dirname + "/src",
  "@db": __dirname + '/src/db',
  "@utils": __dirname + "/src/utils",
  "@model": __dirname + "/src/model",
  "@assets": __dirname + "/src/assets",
  "@config": __dirname + "/src/config",
  "@service": __dirname + "/src/service",
  "@middleware": __dirname + "/src/middleware",
  "@controller": __dirname + "/src/controller"
});
const Koa = require('koa');
const app = new Koa();
const router = require("./src/routers/index.js");
app.use(router.routes(), router.allowedMethods()); // 启用路由，允许网络请求
app.listen(5050, () => {
    console.debug('Server is running at http://localhost:' + 5050);
});