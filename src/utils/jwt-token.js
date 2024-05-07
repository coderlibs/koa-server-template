/**
 * @程序员资源库 coderlibs出品
 **/
const jwt = require('jsonwebtoken'); // 用于签发、解析`token`
const { tokenInfo } = require('@/config');
/* 获取token */
function getToken(payload = {}) {
    return jwt.sign(payload, tokenInfo.TokenSecret, { expiresIn: tokenInfo.tokenExpiresTime  });
}

/* 通过token获取JWT的payload部分 */
function getJWTPayload(token) {
    // 验证并解析JWT
    return jwt.decode(token, tokenInfo.TokenSecret)
}

module.exports = {
    getToken,
    getJWTPayload
}