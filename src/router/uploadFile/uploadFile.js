import Router from 'koa-router';
import fs from 'fs';
import path from 'path';
import md5 from 'js-md5';

const router = new Router();



router.post('/uploadfile', async (ctx, next) => {
    // 上传单个文件
    let file = ctx.request.files.file; // 获取上传文件
    // 创建可读流
    let reader = fs.createReadStream(file.path);
    // 统一文件名
    let name = md5(`${new Date().getTime()}${file.name}`);
    let filePath = path.join(__dirname, '../../public/upload/') + `/${name}.png`;
    // 创建可写流
    let upStream = fs.createWriteStream(filePath);
    // 可读流通过管道写入可写流
    reader.pipe(upStream);
    // 本地 
    // 服务器  http://111.229.45.205:3000/
    return ctx.body = {code:'0000',msg:"图片上传成功",url:`http://192.168.116.235:3000/upload/${name}.png`,imageName:`${name}.png`};
})
export default router;