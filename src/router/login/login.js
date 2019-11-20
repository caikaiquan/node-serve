import Router from 'koa-router';
const router = new Router();

router.get('/login',async(ctx,next) =>{
    ctx.response.body = "Hello Login"
})


router.post('/login',async(ctx,next) =>{
    let body = ctx.request.body;
    ctx.response.body = body;
})
export default router;

