const Router = require('koa-router');
const { handlePassword } = require('@middleware/passwordHandle');
const db = require('@db');
const login = new Router();
const { v1: uuidv1 } = require('uuid');
const { setCookies } = require("@utils/setCookies");
const { getToken } = require('@utils/jwt-token');

// 注册账号
login.post('/register', async (ctx,next) => {
    let res = await handlePassword(ctx)
    let body = res.request.body
    let hasUser = await db.query(`SELECT * FROM user WHERE account='${body.account}' or userName='${body.name}'`)
    if(hasUser.length && hasUser[0].account === body.account){
        ctx.status = 400
        ctx.msg = "抱歉，您的账号已被注册！"
    }else if(hasUser.length && hasUser[0].userName === body.name){
        ctx.status = 400
        ctx.msg = "抱歉，您的用户名已被使用，请换一个吧！"
    }else{
        const uuid="cl_"+uuidv1().split('-').join("")
        let time = Date.now(); 
        let sqlLang = `INSERT INTO user VALUES ('0', '${uuid}', '${body.name}', '${body.account}', '${body.password}', '无个性，不签名！','${time}')`;
        try{
            let code = await db.query(sqlLang)
            if(code){
                ctx.Relust = "恭喜您，账号注册成功！" 
            }
        }catch(err){
            ctx.msg = err
            ctx.status = 400
        }
    }
})

// 登录账号
login.post('/login', async (ctx,next) => {
    let res = await handlePassword(ctx)
    let body = res.request.body
    let hasAccount = await db.query(`SELECT * FROM user WHERE account='${body.account}'`)
    if(hasAccount.length){
        let hasPassword = await db.query(`SELECT * FROM user WHERE account='${body.account}' and password='${body.password}'`)
        if(hasPassword.length){
            let obj = hasPassword[0]
            delete obj.password
            ctx.Relust = {
                message:"尊贵的用户，欢迎回家！",
                data:obj
            }
            let user = JSON.parse(JSON.stringify(hasPassword))[0]
            let token = getToken({account:user.account,password:user.password})
            if (token) {
                return setCookies(ctx, token, user.account, user.userId);
            }
            setCookies(ctx, null, null, null);
        }else{
            ctx.status = 400
            ctx.msg = "抱歉，您的密码错误，请重新输入！"
        }
    }else{
        ctx.status = 400
        ctx.msg = "抱歉，您的邮箱账号未注册！"
    }
})

// 退出登录
login.get('/signout', async (ctx,next) => {
    setCookies(ctx, null, null, null);
    ctx.body = "退出成功"
})
module.exports = login;