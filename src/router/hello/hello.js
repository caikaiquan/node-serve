import Router from 'koa-router';
const router = new Router();


// router.get('/hello',async(ctx,next) =>{
//     // let body = ctx.response.body;
//     // ctx.body = {code:0000,msg:"success"};
// })

router.get('/hello',async(ctx,next) =>{
    ctx.body = {code:8888,msg:"success"};
})

export default router;