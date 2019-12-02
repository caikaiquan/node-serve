import combineRouters from 'koa-combine-routers';

// import Login from './login/login'
import Hello from './hello/hello'

const router = combineRouters(
    // Login,
    Hello
)


export default router;