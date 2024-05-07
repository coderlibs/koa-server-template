/**
 * @程序员资源库 coderlibs出品
 **/
var mysql = require('mysql')
const { dbConfig } = require('@/config')
var pool = mysql.createPool(dbConfig) // 创建连接池

//对数据库进行增删改查操作的基础
function query(sql,callback){
    return new Promise((resolve, reject) => {
        pool.getConnection(function(err,connection){
            connection.query(sql, function (err,rows) {
                if(callback) callback(err,rows)
                connection.release()
                if(err) reject(err)
                resolve(rows)
            })
        })
    })
}

// 1.connection.release() 当一个连接不需要使用时，使用该方法将其归还到连接池中
// 2.connection.destroy() 当一个连接不需要使用且需要从连接池中移除时，可以使用该方法
// 3.pool.end() 当一个连接池不需要使用时，可以使用该方法关闭连接池
exports.query = query;