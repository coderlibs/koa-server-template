const axios = require('axios');
const { v1: uuidv1 } = require('uuid');
class Service {
    // 查询新闻列表
    async getNewsList(ctx) {
        let data = await axios.get(`https://newsapi.org/v2/everything?q=tesla&from=2024-04-07&sortBy=publishedAt&apiKey=API_KEY`)
        if(data){
            data = JSON.parse(JSON.stringify(data.data))
            let RelustId = uuidv1()
            if(data){
                ctx.body = {
                    Relust:{...data},
                    RelustId
                };
            }else{
                ctx.msg = "数据获取失败，请稍后再试"
                ctx.status = 400
            }
        }else{
            ctx.status = 400
        }
    }
}
module.exports = new Service();