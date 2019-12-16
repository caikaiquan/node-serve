import Router from 'koa-router'
import md5 from 'js-md5'
import MysqlConnection from '../../mysql/index'
import { handleCreateTime, InvalidTokenTime, errorRes, success } from '../common.js'

const router = new Router();
const sql = new MysqlConnection();

router.post('/mavoneditor', async (ctx, next) => {
    let option = ctx.request.body;
    let token = ctx.request.headers.token;
    let userRes = await sql.select(`select username from user WHERE token='${token}';`)
    let author = userRes[0].username;
    // 查询失败
    if (userRes.code === '9999' || !author) {
        ctx.response.body = { ...errorRes, msg: "网络异常" };
        return
    }
    // author           作者
    // create_time      创建时间
    // updata_time      更新时间
    // article_id       文章id 唯一  md5加密生成
    // content          文章内容
    // title            文章标题
    // article_type     文章类型    
    // article_describe 文章描述
    let create_time = handleCreateTime();
    let updata_time = '';
    let article_id = md5(new Date().getTime()+option.title);
    let title = option.title;
    let content = option.context;
    let article_type = option.region;
    let article_describe = option.desc;
    let res = await sql.select(`INSERT INTO article_table(author,create_time,updata_time,article_id,content,title,article_type,article_describe) VALUES('${author}','${create_time}','${updata_time}','${article_id}','${content}','${title}','${article_type}','${article_describe}');`)
    ctx.response.body = {...success,msg:'添加成功'};
})


router.get('/getarticleContent',async(ctx,next) =>{
    let query = ctx.request.query;
    let id = query.id;
    let res = await sql.select(`SELECT * from article_table WHERE article_id='${id}';`);
    ctx.response.body = {...success,msg:"查询成功",data:res[0]};
})

export default router;