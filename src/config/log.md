# 日志清理

## 清理一周前的node后台服务日志 koa-server-template

```shell
find (your server path)/koa-server-template/logs -mtime 6 -name "*.log" -exec rm -rf {} \;
```