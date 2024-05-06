const Router = require('koa-router');
const { handlePassword } = require('@middleware/passwordHandle');
const db = require('@db');
const login = new Router();
const { v1: uuidv1 } = require('uuid');
const { setCookies } = require("@utils/setCookies");
const { getToken } = require('@utils/jwt-token');

// 发送邮箱验证码
login.post('/sedcode', async (ctx) => {
    let query = ctx.request.body
    let email = query?query.email:""
    send_email(email).then(res=>{
        ctx.Relust = res
    }).catch(err=>{
        ctx.msg = err
        ctx.status = 400
    })
})

// 注册账号
login.post('/register', async (ctx,next) => {
    let res = await handlePassword(ctx)
    let body = res.request.body
    let hasUser = await db.query(`SELECT * FROM coderuser_list WHERE email='${body.email}' or userName='${body.name}'`)
    if(hasUser.length && hasUser[0].email === body.email){
        ctx.status = 400
        ctx.msg = "抱歉，您的邮箱账号已被注册！"
    }else if(hasUser.length && hasUser[0].userName === body.name){
        ctx.status = 400
        ctx.msg = "抱歉，您的用户名已被使用，请换一个吧！"
    }else{
        let istrue = verify_email(body.email,body.verifycode)
        if(!istrue){
            ctx.msg = "验证码错误，请重试"
            ctx.status = 400
        }else{
            const uuid="cl_"+uuidv1().split('-').join("")
            let num = Math.floor(Math.random()*36+1)
            let photo = `https://coderlibs.com/www/wwwroot/public/img/coderlibs/userimg/photo/${num}.jpg`
            let time = Date.now(); 
            let sqlLang = `INSERT INTO coderuser_list VALUES ('0', '${uuid}', '${body.name}', '${body.email}', '${body.password}', '${photo}','', false ,'无个性，不签名！','2','${time}')`;
            try{
                let code = await db.query(sqlLang)
                if(code){
                    ctx.Relust = "恭喜您成为尊贵的程序员资源库用户，愿coderlibs照亮您的事业与前程！" 
                }
            }catch(err){
                ctx.msg = err
                ctx.status = 400
            }
        }
    }
})

// 登录账号
login.post('/login', async (ctx,next) => {
    let res = await handlePassword(ctx)
    let body = res.request.body
    let hasEmail = await db.query(`SELECT * FROM coderuser_list WHERE email='${body.email}'`)
    if(hasEmail.length){
        let hasPassword = await db.query(`SELECT * FROM coderuser_list WHERE email='${body.email}' and password='${body.password}'`)
        if(hasPassword.length){
            let obj = hasPassword[0]
            delete obj.password
            ctx.Relust = {
                message:"尊贵的coderlibs用户，欢迎回家，即将进入编程世界！",
                data:obj
            }
            let user = JSON.parse(JSON.stringify(hasPassword))[0]
            let token = getToken({email:user.email,password:user.password})
            if (token) {
                return setCookies(ctx, token, user.email, user.userId);
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