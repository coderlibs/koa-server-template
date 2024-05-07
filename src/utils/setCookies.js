/**
 * @程序员资源库 coderlibs出品
 **/
const { tokenInfo } = require("@/config");

function setCookie(ctx, key, value, httpOnly = true) {
    const domains = ctx.state.domains;
    const CookieExpire = domains && domains.CookieExpire;
    const CookieDomain = domains && domains.CookieDomain;
    const expires = new Date(new Date().getTime() + CookieExpire);
    const expiredExpires = new Date(new Date().getTime() - 1000);
    ctx.cookies.set(key, value, { domain: '.' + CookieDomain, path: '/', expires: value ? expires : expiredExpires, httpOnly });
}

function setCookies(ctx, token, email, id) {
    // 过期时间为当前时间+有效期时间段
    setCookie(ctx, tokenInfo.TokenName, token);
    setCookie(ctx, 'account_user', email, false);
    setCookie(ctx, 'account_id', id, false);
}

module.exports = {
    setCookies,
    setCookie,
};