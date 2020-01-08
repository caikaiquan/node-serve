import Router from 'koa-router';
import MysqlConnection from '../../mysql/index'
import md5 from 'js-md5'
// import jwt from 'jsonwebtoken'
import {InvalidTokenTime,errorRes,success} from '../common.js'

const router = new Router();
const sql = new MysqlConnection();


// const secret = 'jwt demo'

router.get('/test',async(ctx,next) =>{
    setTimeout(() =>{
        ctx.response.body = {code:'0000',msg:'这是一个测试接口'};
    },50)
})

router.post('/blog/sign', async (ctx, next) => {
    let option = ctx.request.body;
    let username = option.username;
    let pass = option.pass;
    if (!username || !pass) {
        ctx.response.body = { ...errorRes, msg: '用户名或密码必填' };
        return
    }
    pass = md5(pass + 'js-md5');
    let res = await sql.select(`SELECT * FROM user WHERE username='${username}' and pass='${pass}';`);
    if (res.length) {
        res = JSON.parse(JSON.stringify(res))[0];
        if (res.username === username && res.pass === pass) {
            let token = md5(username+pass);
            let token_time = InvalidTokenTime();
            let handleSign = await sql.select(`UPDATE user SET token='${token}',token_time='${token_time}' WHERE username='${username}';`)
            // // 生成token
            // let userToken = {
            //     name: username
            // }
            // const jwdToken = jwt.sign(userToken, secret, {expiresIn: '1h'})
            ctx.response.body = { ...success, msg: "登录成功",user:{token,username}};
        }
    }else {
        let res = await sql.select(`SELECT * FROM user WHERE username='${username}';`);
        if(res.length){
            res = JSON.parse(JSON.stringify(res))[0];
            if(res.pass !== pass){
                ctx.response.body = { ...errorRes, msg: "密码错误!!!" }
            }
        }else{
            ctx.response.body = { ...errorRes, msg: "该用户不存在!!!" }
        }
    }
})
export default router;

