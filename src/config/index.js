const develop = process.env.NODE_ENV == "development"
module.exports = {
    develop, // 是否是开发环境
    port: develop ? 5050 : 80, // 服务端口
    domains: {
        CookieDomain: !develop ? 'your domain name' : "localhost", // 前端请求地址
        CookieExpire: 60 * 1000 * 60 * 32 // 过期时间  多加8小时，中国位于东八区比标准时间相差8小时
    },
    tokenInfo: {
        TokenName: "web_token", // token
        TokenSecret: "your domain name", // 签名
        tokenExpiresTime: 60 * 60 * 24 // 过期时间 24小时
    },
    dbConfig: {
        host: 'localhost', // 连接的服务器(代码托管到线上后，需改为内网IP，而非外网)
        port: 3306, // mysql服务运行的端口
        database: 'your database', // 链接的数据库
        user: develop ? 'root' : 'your database user name', // 用户名
        password: develop ? '12345678' : 'your server database password' // 用户密码   
    },
    noverifyToken: ['/'], // 接口请求免验证
    nologgerList: [] // 接口请求日志免打印
}