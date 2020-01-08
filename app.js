const koa = require('koa');
const app = new koa();
const bodyParser = require('koa-bodyparser');
const Router = require('koa-router');
const router = new Router();
// const views = require('koa-views');
// const static = require('koa-static');
const path = require('path');
 
const { sign } = require('jsonwebtoken');
const secret = 'demo';
const jwt = require('koa-jwt')({secret});
 
app.use(bodyParser())
// app.use(views(__dirname + '/views', {
//     map: {html: 'ejs'}
// }))
 
// app.use(static(path.join(__dirname, './src/public')))
 
app.use(async (ctx, next) => {
    console.log(ctx)
    let params =Object.assign({}, ctx.request.query, ctx.request.body);
    ctx.request.header = {'authorization': "Bearer " + (params.token || '')}
    await next();
})
 
router.get('/', async (ctx, next) => {
    await ctx.render('index')
})
 
router.post('/login', async (ctx, next) => {
    const user = ctx.request.body;
    if (user && user.username === 'tate') {
        let {username} = user;
        const token = sign({username, test: 'testok'}, secret, {expiresIn: '1h'});
        ctx.body = {
            mssage: 'GET TOKEN SUCCESS',
            code: 1,
            token
        }
    } else {
        ctx.body = {
            message: 'param error',
            code: -1
        }
    }
})
.get('/userinfo', jwt, async (ctx, next) => {
    ctx.body = {username: ctx.state.user.username}
    console.log(ctx)
})
.get('/viplist', jwt, async (ctx, next) => {
    console.log(ctx.state)
    ctx.body = 'check ok'
})
 
router.get('/404', async (ctx, next) => {
    await ctx.render('404')
})
 
app
    .use(router.routes())
    .use(router.allowedMethods())
app.listen(3000, () => {
    console.log('server is running at port 3000');
    console.log(3)
})