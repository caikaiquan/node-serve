import Router from 'koa-router';
import MysqlConnection from '../../mysql/index'

const router = new Router();
const sql = new MysqlConnection();

router.get('/test',async(ctx,next) =>{
    let res = await sql.select("select * from category");
    ctx.response.body = res
})

var arr = [
    { name: '陆启钟', id_code: '320681199503033944'},
    { name: '吕兴泰', id_code: '320681199503039289'},
    { name: '米天敬', id_code: '320681199503032028'},
    { name: '熊湛奇', id_code: '320681199503033848'},
    { name: '扬平令', id_code: '320681199503037988'},
    { name: '董琳莺', id_code: '320681199503033522'},
    { name: '杨耀嫣', id_code: '320681199503035886'},
    { name: '贾西真', id_code: '320681199503038585'},
    { name: '钱阁', id_code: '320681199503039481'},
    { name: '牛浪杰', id_code: '320681199503036088'},
    { name: '吴雄贤', id_code: '320681199503031121'},
    { name: '施茜', id_code: '320681199503032669'},
    { name: '严睿台', id_code: '320681199503038948'},
    { name: '梁浩友', id_code: '320681199503032749'},
    { name: '刘荷', id_code: '320681199503039262'},
    { name: '杨陵', id_code: '320681199503039545'},
    { name: '熊慧刚', id_code: '320681199503035202'},
    { name: '石黑世', id_code: '320681199503037881'},
    { name: '邓跃', id_code: '320681199503039705'},
    { name: '牛巧薇', id_code: '320681199503035069'},
    { name: '金卫桐', id_code: '320681199503035026'},
    { name: '文菱源', id_code: '320681199503035501'},
    { name: '谢杏雷', id_code: '320681199503036387'},
    { name: '戴九华', id_code: '32068119950303324X'},
    { name: '郭谦士', id_code: '320681199503032909'},
    { name: '傅梧福', id_code: '320681199503039246'},
    { name: '米杨义', id_code: '32068119950303180X'},
    { name: '宋杏竹', id_code: '320681199503037064'},
    { name: '蔡瑞金', id_code: '320681199503034242'},
    { name: '邹雉桂', id_code: '320681199503039828'},
    { name: '任承台', id_code: '320681199503032888'},
    { name: '袁湖', id_code: '320681199001019165'},
    { name: '潘代', id_code: '320681199001011569'},
    { name: '汪旅椿', id_code: '320681199001019683'},
    { name: '孙后主', id_code: '320681199001014743'},
    { name: '何鼎曦', id_code: '320681199001013468'},
    { name: '韦润上', id_code: '320681199001016749'},
    { name: '林铭征', id_code: '320681199001014962'},
    { name: '许旭', id_code: '32068119900101134X'},
    { name: '张天椿', id_code: '32068119900101804X'},
    { name: '孟伟', id_code: '320681199001015324'},
    { name: '刘逸上', id_code: '320681199001015869'},
    { name: '崔系颜', id_code: '320681199001017581'},
    { name: '扬晴', id_code: '320681199001017960'},
    { name: '温绫', id_code: '320681199001018429'},
    { name: '扬欢', id_code: '320681199001014209'},
    { name: '文贝', id_code: '320681199001017426'},
    { name: '谢易华', id_code: '320681199503039588'},
    { name: '许芒守', id_code: '320681199504159565'},
    { name: '郭群江', id_code: '320681199504153729'},
    { name: '邵殿', id_code: '320681199504158546'},
    { name: '王团恒', id_code: '320681199504157949'},
    { name: '丁贤全', id_code: '320681199504159848'},
    { name: '董心桂', id_code: '32068119950415916X'},
    { name: '季建锋', id_code: '320681199504152566'},
    { name: '温千', id_code: '320681199504151643'},
    { name: '康森七', id_code: '320681199504152160'},
    { name: '韩界纪', id_code: '320681199504154588'},
    { name: '吴中', id_code: '320681199504153649'},
    { name: '徐莲', id_code: '320681199504158925'},
    { name: '邓温思', id_code: '320681199504159282'},
    { name: '毛家歌', id_code: '320681199504157148'},
    { name: '黄七娘', id_code: '320681199504151424'},
    { name: '金蓉柱', id_code: '320681199504155601'},
    { name: '洪泰', id_code: '320681199504155708'},
    { name: '夏真石', id_code: '32068119950415190X'},
    { name: '夏同', id_code: '320681199504158060'},
    { name: '赖华', id_code: '32068119950415684X'},
    { name: '何豹圣', id_code: '320681199504152224'},
    { name: '田鑫苍', id_code: '320681199504152080'},
    { name: '段玑美', id_code: '320681199504151707'},
    { name: '代碧兴', id_code: '320681199504151125'},
    { name: '尹天萍', id_code: '320681199504157607'},
    { name: '魏嘉', id_code: '320681199504158060'},
    { name: '扬桐步', id_code: '32068119950415588X'},
    { name: '田浩印', id_code: '320681199504152603'},
    { name: '邹朱', id_code: '320681199504155329'},
    { name: '张全娟', id_code: '320681199504159389'},
    { name: '胡枫佩', id_code: '32068119950415406X'},
    { name: '赵灵爱', id_code: '320681199504154940'},
    { name: '郑彪怡', id_code: '310115199005019661'},
    { name: '宋洋世', id_code: '310115199005019805'},
    { name: '洪馨心', id_code: '310115199005014764'},
    { name: '陆戊悦', id_code: '310115199005012662'},
    { name: '牛威近', id_code: '31011519900501350X'},
    { name: '吴世', id_code: '310115199005013948'},
    { name: '谭进声', id_code: '31011519900501692X'},
    { name: '赖翠钟', id_code: '310115199005012064'},
    { name: '严芒里', id_code: '310115199005011547'},
    { name: '康妮榆', id_code: '310115199005016102'},
    { name: '文伯嫣', id_code: '310115199005013243'},
    { name: '尹平婷', id_code: '310115199005012187'},
    { name: '陆馨宏', id_code: '310115199005014940'},
    { name: '马佳', id_code: '310115199005015265'},
    { name: '代森', id_code: '310115199005014086'},
    { name: '薛隐冰', id_code: '310115199005015660'},
    { name: '秦璇梅', id_code: '310115199005016065'},
    { name: '宋念衣', id_code: '310115199005014844'},
    { name: '尹贵彩', id_code: '310115199005018968'},
    { name: '冯林万', id_code: '310115199005018001'},
]

router.get('/addCode',async(ctx,next) =>{
    let sqlStr = `INSERT INTO idcode(id,name,id_code) VALUES `;
    arr.forEach((item,index) =>{
        if(index === 0){
            sqlStr += `(${index+1},'${item.name}','${item.id_code}')`
        }else{
            sqlStr += `,(${index+1},'${item.name}','${item.id_code}')`
        }
    })
    let res = await sql.select(sqlStr);
    ctx.response.body = res;
})

router.get('/querycode',async(ctx,next) =>{
    let id = Math.ceil(Math.random()*100);
    let sqlStr = `SELECT * from idcode WHERE id=${id};`
    let res = await sql.select(sqlStr);
    let resdata;
    console.log(res)
    if(res.length){
       let {name:name,id_code:id} = res[0];
       resdata = {
           code:'0000',
           name,
           id
       }
    }else{
        resdata = {code:'9999',msg:"查询失败"}
    }
    ctx.response.body = resdata;
})
export default router;

