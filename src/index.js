import Koa from 'koa';
import router from './router/router';
import json from 'koa-json';
import bodyParser from 'koa-bodyparser';
// import koaBody from require('koa-body');
import Cors from 'koa2-cors';
import serve from 'koa-static';
import koaBody from 'koa-body';
const app = new Koa();


app.use(koaBody({
    multipart: true,
    formidable: {
        maxFileSize: 200*1024*1024    // 设置上传文件大小最大限制，默认2M
    }
}));
// 配置静态资源目录
app.use(serve(__dirname+"/public"));
// 配置跨域
// app.use(Cors());
app.use(Cors({
    origin: (ctx) => {
        return ctx.header.origin
    },
    exposeHeaders: ['WWW-Authenticate', 'Server-Authorization', 'Date'],
    maxAge: 100,
    credentials: true,
    allowMethods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowHeaders: ['Content-Type', 'Authorization', 'Accept', 'X-Custom-Header', 'anonymous','token'],
}));
// post请求传参
app.use(bodyParser());


// 转json
app.use(json());
// 路由合并
app.use(router());
// 获取本机ip
let getIPAdress = () => {
    const interfaces = require('os').networkInterfaces();
    let address;
    for (let key in interfaces) {
        interfaces[key].forEach(item => {
            if (item.family === 'IPv4' && item.address !== '127.0.0.1' && item.internal !== true) {
                address = item.address;
            }
        })
    }
    return address;
}

let IpAddress = getIPAdress();
console.log(`\x1B[36m%s\x1B[39m`,'App running at: ')
console.log(`\x1B[36m%s\x1B[39m`,` - Local: http://localhost:3000`);
console.log(`\x1B[36m%s\x1B[39m`,` - Network: http://${IpAddress}:3000`);
app.listen(3000);