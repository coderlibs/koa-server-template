const IndexModel = require('@model/main/index');
class IndexController {
    // 查询登录用户信息
    async getUserInfoController(ctx,next) {
        let user = ctx.cookies.get("account_user")
        if(user){
            let Relust = await IndexModel.getUserInfoModel(user)
            ctx.Relust = Relust
         }else{
             ctx.errMsg = "抱歉，未获取到您的用户信息"
         }
    }
}
module.exports = new IndexController();