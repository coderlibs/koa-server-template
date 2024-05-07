/**
 * @程序员资源库 coderlibs出品
 **/
// 对密码进行加密处理
const crypto = require('crypto');
const md5pw = (password) => {
  const md5 = crypto.createHash('md5');
  const result = md5.update(password,'utf8').digest('hex'); //hex表示拿到最终为十六进制
  return result;
}

const handlePassword = async (ctx) =>{
    return new Promise((resolve,reject)=>{
        let { password }  = ctx.request.body;
        ctx.request.body.password = md5pw(password);
        resolve(ctx)
    })
}

module.exports = {
  handlePassword
}