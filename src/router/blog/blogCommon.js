import Router from 'koa-router';
import MysqlConnection from '../../mysql/index'
import md5 from 'js-md5'
import { handleCreateTime, InvalidTokenTime, errorRes, success } from '../common.js'

const router = new Router();
const sql = new MysqlConnection();


router.get('/blog/categoryList',async(ctx,next) =>{
    let res = await sql.select(`select * from category`);
    ctx.response.body = {...success,list:res};
})

router.post('/blog/add/category', async(ctx,next) =>{
    let option = ctx.request.body;
    if(!option.categoryName || !option.categoryId){
        ctx.response.body = {...errorRes,msg:'缺少必要参数'}
    }else{
        let res = await sql.select(`INSERT INTO category(categoryName,categoryId) VALUES('${option.categoryName}','${option.categoryId}')`);
        ctx.response.body = {...success,msg:'新增类型成'}
    }
})

router.post('/blog/delete/category', async(ctx,next) =>{
    let option = ctx.request.body;
    if(!option.categoryName || !option.categoryId){
        ctx.response.body = {...errorRes,msg:'缺少必要参数'}
    }else{
        let res = await sql.select(`DELETE FROM category WHERE categoryName='${option.categoryName}' AND categoryId='${option.categoryId}';`);
        ctx.response.body = {...success,msg:'删除成功'};
    }
})

router.post('/blog/mavoneditor', async (ctx, next) => {
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
    let article_id = option.id || md5(new Date().getTime()+option.title);
    let title = option.title;
    let content = option.context;
    let article_type = option.region;
    let article_describe = option.desc;
    let modify = option.modify;
    if(!modify){
        let res = await sql.select(`INSERT INTO article_table(author,create_time,updata_time,article_id,content,title,article_type,article_describe) VALUES('${author}','${create_time}','${updata_time}','${article_id}','${content}','${title}','${article_type}','${article_describe}');`)
        console.log(res);
        ctx.response.body = {...success,msg:'添加成功',article_id};
    }else{
        updata_time = handleCreateTime();
        // UPDATE user SET token=null,token_time=null WHERE token='47dcd432fd2c6e70907c880a07bfaa65';
        // let res = await sql.select(`INSERT INTO article_table(author,create_time,updata_time,article_id,content,title,article_type,article_describe) VALUES('${author}','${create_time}','${updata_time}','${article_id}','${content}','${title}','${article_type}','${article_describe}');`)
        let res = await sql.select(`UPDATE article_table SET updata_time="${updata_time}",content='${content}',title='${title}',article_type='${article_type}',article_describe='${article_describe}' WHERE article_id='${article_id}';`)
        ctx.response.body = {...success,msg:'修改文章成功',article_id};
    }
})

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

router.get('/blog/getarticleContent',async(ctx,next) =>{
    let query = ctx.request.query;
    let id = query.id;
    let res = await sql.select(`SELECT * from article_table WHERE article_id='${id}';`);
    ctx.response.body = {...success,msg:"查询成功",data:res[0]};
})

export default router;