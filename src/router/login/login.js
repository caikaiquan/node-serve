import Router from 'koa-router';
import MysqlConnection from '../../mysql/index'

const router = new Router();
const getStudent = new MysqlConnection();

router.get('/login',async(ctx,next) =>{
    let res = await getStudent.select("select * from student");
    ctx.response.body = res
})

router.post('/login',async(ctx,next) =>{
    let body = ctx.request.body;
    ctx.response.body = body;
})
export default router;

