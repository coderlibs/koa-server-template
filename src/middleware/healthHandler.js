/**
 * @程序员资源库 coderlibs出品
 **/
'use strict';

// 健康检查

const router = require('koa-router')();

let status = true;

router.get('/inner/api/health/status', (ctx, next) => {
    if (status) {
        ctx.status = 200;
        ctx.body = {
            code: 200,
            result: 'online',
        };
    } else {
        ctx.status = 509;
        ctx.body = {
            code: 509,
            result: 'offline',
        };
    }
});
router.put('/inner/api/health/online', (ctx, next) => {
    status = true;
    ctx.body = {
        code: 200,
        result: '修改成功',
    };
    return;
});

router.put('/inner/api/health/offline', (ctx, next) => {
    status = false;
    ctx.body = {
        code: 200,
        result: '修改成功',
    };
    return;
});

module.exports = router;
