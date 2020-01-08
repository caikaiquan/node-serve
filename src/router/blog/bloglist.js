import Router from 'koa-router';
import MysqlConnection from '../../mysql/index'
import {InvalidTokenTime,errorRes,success} from '../common.js'

const router = new Router();
const sql = new MysqlConnection();

router.post('/blog/bloglist',async(ctx,next) =>{
    let option = ctx.request.body;
    let size = option.size || 10;
    let page = option.page || 1;    
    let startIndex = (page-1)*size; 
    let res = await sql.select(`SELECT author,updata_time,create_time,article_id,title,article_type from article_table Order by create_time desc LIMIT ${startIndex},${size};`);
    let totalRes = await sql.select(`SELECT COUNT(*) as total FROM article_table;`)
    let total = JSON.parse(JSON.stringify(totalRes))[0].total;
    if(res.length){
        ctx.response.body = {...success,msg:"查询成功",data:res,total}
    }else{
        ctx.response.body = {...success,msg:"接口报错"}
    }
});

export default router;