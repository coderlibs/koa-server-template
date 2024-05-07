const Service = require('@service');
class NewsController {
    // 查询新闻列表
    async getNewsList(ctx, next) {
        let data = await Service.getNewsList()
        ctx.body = data
    }
}
module.exports = new NewsController();