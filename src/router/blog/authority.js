import MysqlConnection from '../../mysql/index'
import {InvalidTokenTime} from '../common.js'
const sql = new MysqlConnection();
const authority = async (ctx, next) => {
    let url = ctx.url;
    if(url.includes('/blog')){
        if(url.includes("?")){
            url = url.split('?')[0];
        }
        if (['/blog/logout', '/blog/sign','/blog/register','/blog/bloglist','/blog/getarticleContent'].includes(url)) {
            await next();
        } else {
            console.log(33333)
            let token = ctx.request.headers.token;
            if (!token) {
                ctx.response.body = { code: '6666', msg: '用户未登录请先登录！' };
            } else {
                let tokenRes = await sql.select(`SELECT * from user WHERE token='${token}';`);
                if(tokenRes){
                    tokenRes = JSON.parse(JSON.stringify(tokenRes))[0];
                    let token_time = tokenRes.token_time;
                    let token_time_now = new Date().getTime();
                    if( token_time_now > token_time){
                        await sql.select(`UPDATE user SET token=null,token_time=null WHERE token='${token}';`);
                        ctx.response.body = { code: '6666', msg: "token失效请重新登录" };
                    }else{
                        sql.select(`UPDATE user SET token_time='${InvalidTokenTime()}' WHERE token='${token}';`)
                        await next();
                    }
                }
            }
        }
    }else{
        await next();
    }
}
export default authority