import mysql from 'mysql';

// 设置配置文件
const config = {
    // 启动端口
    port: 3000,
    // 数据库配置
    database: {
        DATABASE: 'test',
        USERNAME: 'root',
        PASSWORD: 'Caikq@2019',
        PORT: '3306',
        HOST: '111.229.45.205'
    }
}

const pool = mysql.createPool({
    host: config.database.HOST,
    user: config.database.USERNAME,
    password: config.database.PASSWORD,
    database: config.database.DATABASE
});
pool.getConnection(function (err, connection) {
    if(err){
        console.log('数据库连接失败111',err)
    }else{
        console.log('\x1B[36m%s\x1B[39m','数据库连接成功')
    }
});

class MysqlConnection {
    constructor() {

    }
    select(sql) {
        return new Promise((resolve, reject) => {
            pool.query(sql, function (error, results, fields) {
                if (error) {
                    resolve({code:"9999",msg:"数据库访问失败222",err:error})
                };
                resolve(results)
            });
        })
    }
}

export default MysqlConnection;