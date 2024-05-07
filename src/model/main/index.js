const db = require('@db');
class IndexModel {
    // 查询登录用户信息
    async getUserInfoModel(user) {
        let userInfo = await db.query(`SELECT * FROM coderuser_list WHERE account='${user}'`) 
        delete userInfo[0].password
        return userInfo[0]
    }
}
module.exports = new IndexModel();