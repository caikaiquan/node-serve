import Koa from 'koa';
import router from './router/router';
import json from 'koa-json';
import bodyParser from 'koa-bodyparser';
import Cors from 'koa2-cors';
import serve from 'koa-static';

const app = new Koa();

// 配置静态资源目录
app.use(serve(__dirname+"/public"));
// 配置跨域
app.use(Cors());
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
console.log(`\x1B[33m%s\x1B[39m`,'App running at: ')
console.log(`\x1B[35m%s\x1B[39m`,` - Local: http://localhost:8080`);
console.log(`\x1B[36m%s\x1B[39m`,` - Network: http://${IpAddress}:8080`);
app.listen(8080);
// var styles = {
//     'bold'          : ['\x1B[1m%s\x1B[22m'],
//     'italic'        : ['\x1B[3m%s\x1B[23m'],
//     'underline'     : ['\x1B[4m%s\x1B[24m'],
//     'inverse'       : ['\x1B[7m%s\x1B[27m'],
//     'strikethrough' : ['\x1B[9m%s\x1B[29m'],
//     'white'         : ['\x1B[37m%s\x1B[39m'],
//     'grey'          : ['\x1B[90m%s\x1B[39m'],
//     'black'         : ['\x1B[30m%s\x1B[39m'],
//     'blue'          : ['\x1B[34m%s\x1B[39m'],
//     'cyan'          : ['\x1B[36m%s\x1B[39m'],
//     'green'         : ['\x1B[32m%s\x1B[39m'],
//     'magenta'       : ['\x1B[35m%s\x1B[39m'],
//     'red'           : ['\x1B[31m%s\x1B[39m'],
//     'yellow'        : ['\x1B[33m%s\x1B[39m'],
//     'whiteBG'       : ['\x1B[47m%s\x1B[49m'],
//     'greyBG'        : ['\x1B[49;5;8m%s\x1B[49m'],
//     'blackBG'       : ['\x1B[40m%s\x1B[49m'],
//     'blueBG'        : ['\x1B[44m%s\x1B[49m'],
//     'cyanBG'        : ['\x1B[46m%s\x1B[49m'],
//     'greenBG'       : ['\x1B[42m%s\x1B[49m'],
//     'magentaBG'     : ['\x1B[45m%s\x1B[49m'],
//     'redBG'         : ['\x1B[41m%s\x1B[49m'],
//     'yellowBG'      : ['\x1B[43m%s\x1B[49m']
// };