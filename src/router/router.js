import combineRouters from 'koa-combine-routers';

import Login from './login/login'
import Hello from './hello/hello'
import Test from './test/test1'

const router = combineRouters(
    Login,
    Hello,
    Test
)


export default router;