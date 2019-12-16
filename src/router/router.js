import combineRouters from 'koa-combine-routers'
import Login from './login/login'
import Hello from './hello/hello'
import Test from './test/test1'
import Register from './blog/register'
import Sign from './blog/Sign'
import Logout from './blog/logout'
import UploadFile from './uploadFile/uploadFile'
import Mavoneditor from './blog/Mavoneditor'
const router = combineRouters(
    Login,
    Hello,
    Test,
    Register,
    Sign,
    Logout,
    UploadFile,
    Mavoneditor
)


export default router;