# koa-server-template
基于koa封装的开箱即用的node服务端项目模板

#### 介绍
本项目是从coderlibs官方后台服务剥离出来的通用后端模板

#### 软件架构
软件架构说明

本项目由node框架koa搭建，遵循MVC架构规范
- M层(model) 模型层，负责调用数据库，处理返回数据
- V层(view) 模板层，由后端提供模板，根据数据渲染前端页面返回给前端，由于coderlibs前端是分离独立开发，所以将public作为view层目录，存放前端静态资源
- C层(controller)，控制器，负责处理前端交互动作，校验前端参数，调用service服务或model层获取数据，处理后端异常等功能

#### 项目运行

1.  node版本建议16+
2.  本地运行：mac版本使用 npm run dev; win版本使用 npm run win:dev
3.  线上部署使用nvm管理，npm start
   
#### 参与贡献

本项目作者由前端架构师 类维松 全权负责开发维护