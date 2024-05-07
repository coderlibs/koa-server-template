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
const path = require('path');
const fs = require('fs');
const static = require('koa-server-static');
const router = require("./src/routers/index.js");
const setup = require('./src/hooks/setup.js');
const mounted = require('./src/hooks/mounted.js');
const { port } = require('@config/index.js');
const { historyApiFallback } = require('koa2-connect-history-api-fallback');
const app = new Koa();

// 处理前端404页面请求
app.use(async (ctx, next) => {
    if (ctx.request.url.startsWith('/404')) {
        ctx.type = 'html';
        ctx.body = await fs.promises.readFile(path.join(__dirname, '/public/404', 'index.html'), 'utf-8');
    } else {
        await next();
    }
});

// 适配前端history路由
app.use(historyApiFallback({ whiteList: [/^\/web\/.*/, /^\/main\/.*/, /^\/test\/.*/, /.*publicApi.*?(?=\b)/], index: '/index.html' }));
app.proxy = true; // 声明应用程序在反向代理服务器后面
setup(app) // 挂载内部逻辑处理
// 前端静态资源
app.use(static(path.join(__dirname + '/public/pc'), { facility: 'pc' })); // 获取pc端静态资源
app.use(static(path.join(__dirname + '/public/app'), { facility: 'md' })); // 获取移动端静态资源
mounted(app) // 挂载完成，处理成功信息返回给客户端
app.use(router.routes(), router.allowedMethods()); // 启用路由，允许网络请求

app.listen(port, () => {
    console.debug('Server is running at http://localhost:' + port);
});