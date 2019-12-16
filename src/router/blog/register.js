import Router from 'koa-router'
import MysqlConnection from '../../mysql/index'
import md5 from 'js-md5'
import {handleCreateTime,InvalidTokenTime,errorRes,success} from '../common.js'
const router = new Router();
const sql = new MysqlConnection();
// router.get('/register', async (ctx, next) => {
//     let option = ctx.request.query;
//     let username = option.username;
//     let pass = option.pass;
//     if (!username || !pass) {
//         resolve({ ...errorRes, msg: '缺少必填参数' })
//         return
//     }
//     let resQuery = await sql.select(`select * from user where username='${username}'`);
//     if (!resQuery.length) {
//         pass = md5(pass + 'js-md5');
//         await sql.select(`INSERT INTO user(username,pass) VALUES ('${username}','${pass}')`);
//         ctx.response.body = { ...success, msg: "注册成功" };
//     } else {
//         ctx.response.body = { ...errorRes, msg: '该账号已经注册' };
//     }
// })

router.post('/register', async (ctx, next) => {
    let option = ctx.request.body;
    let username = option.username;
    let pass = option.pass;
    if (!username || !pass) {
        ctx.response.body = { ...errorRes, msg: '缺少必填参数' };
        return
    }
    let resQuery = await sql.select(`select * from user where username='${username}'`);
    if (!resQuery.length) {
        pass = md5(pass + 'js-md5');
        let create_time = handleCreateTime();
        let token = md5(username+pass);
        let token_time = InvalidTokenTime();
        console.log('token_time',token_time)
        let res = await sql.select(`INSERT INTO user(username,pass,create_time,token,token_time) VALUES ('${username}','${pass}','${create_time}','${token}','${token_time}')`);
        if(res){
            console.log(res);
            ctx.response.body = { ...success, msg: "注册成功",user:{token,username}};
        }
    } else {
        ctx.response.body = { ...errorRes, msg: '该账号已经注册' };
    }
})


export default router;