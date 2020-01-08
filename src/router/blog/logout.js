import Router from 'koa-router'
import MysqlConnection from '../../mysql/index'
import {errorRes,success} from '../common.js'
import jwt from 'jsonwebtoken'

const router = new Router();
const sql = new MysqlConnection();
const secret = 'jwt demo'
const jwt1 = require('koa-jwt')({secret});

router.get('/blog/logout',async(ctx,next) =>{
    let token = ctx.request.header.token;
    if(!token){
        ctx.response.body = {...errorRes,msg:"非法请求",error:"token不存在"};
        return
    }
    let res = await sql.select(`UPDATE user SET token=null,token_time=null WHERE token='${token}';`);
    ctx.response.body = {...success,msg:"退出登录成功"};
})

export default router;