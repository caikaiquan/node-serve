## MySql学习

#### 整数类型
```
TINYINT	-128〜127	0 〜255
SMALLINT	-32768〜32767	0〜65535
MEDIUMINT	-8388608〜8388607	0〜16777215
INT (INTEGER)	-2147483648〜2147483647	0〜4294967295
BIGINT	-9223372036854775808〜9223372036854775807	0〜18446744073709551615
```

#### 小数类型
```
FLOAT	单精度浮点数	4 个字节     有符号的取值范围：-3.402823466E+38～-1.175494351E-38。    无符号的取值范围：0 和 -1.175494351E-38～-3.402823466E+38。
DOUBLE	双精度浮点数	8 个字节
DECIMAL (M, D)，DEC	压缩的“严格”定点数	M+2 个字节
```

#### 日期类型
```
YEAR	YYYY	1901 ~ 2155	1 个字节
TIME	HH:MM:SS	-838:59:59 ~ 838:59:59	3 个字节
DATE	YYYY-MM-DD	1000-01-01 ~ 9999-12-3	3 个字节
DATETIME	YYYY-MM-DD HH:MM:SS	1000-01-01 00:00:00 ~ 9999-12-31 23:59:59	8 个字节
TIMESTAMP	YYYY-MM-DD HH:MM:SS	1980-01-01 00:00:01 UTC ~ 2040-01-19 03:14:07 UTC	4 个字节
```

#### 字符串类型
```
CHAR(M)	固定长度非二进制字符串	M 字节，1<=M<=255
VARCHAR(M)	变长非二进制字符串	L+1字节，在此，L< = M和 1<=M<=255
TINYTEXT	非常小的非二进制字符串	L+1字节，在此，L<2^8
TEXT	小的非二进制字符串	L+2字节，在此，L<2^16
MEDIUMTEXT	中等大小的非二进制字符串	L+3字节，在此，L<2^24
LONGTEXT	大的非二进制字符串	L+4字节，在此，L<2^32
ENUM	枚举类型，只能有一个枚举字符串值	1或2个字节，取决于枚举值的数目 (最大值为65535)
SET	一个设置，字符串对象可以有零个或 多个SET成员	1、2、3、4或8个字节，取决于集合 成员的数量（最多64个成员）
```

#### 二进制类型
```
BIT(M)	位字段类型	大约 (M+7)/8 字节
BINARY(M)	固定长度二进制字符串	M 字节
VARBINARY (M)	可变长度二进制字符串	M+1 字节
TINYBLOB (M)	非常小的BLOB	L+1 字节，在此，L<2^8
BLOB (M)	小 BLOB	L+2 字节，在此，L<2^16
MEDIUMBLOB (M)	中等大小的BLOB	L+3 字节，在此，L<2^24
LONGBLOB (M)	非常大的BLOB	L+4 字节，在此，L<2^32
```

### 关联两张表
```
1. 新建两张表 
创建category表
CREATE TABLE category(cid VARCHAR(32) PRIMARY KEY,cname VARCHAR(100));
create table category(cid varchar(32) primary key,cname varchar(100));
创建product表
CREATE TABLE product(pid VARCHAR(32) PRIMARY KEY,pname VARCHAR(40),price DOUBLE,category_id VARCHAR(32));

2. 添加数据
insert into category(cid,cname) values('c001','家电');
insert into category(cid,cname) values('c002','服饰');
insert into category(cid,cname) values('c003','化妆品');
insert into product(pid,pname,price,category_id) values('p001','联想','5000','c001');
insert into product(pid,pname,price,category_id) values('p002','海尔','5000','c001');
insert into product(pid,pname,price,category_id) values('p003','雷神','5000','c001');
insert into product(pid,pname,price,category_id) values('p004','JACK JONES','800','c002');
insert into product(pid,pname,price,category_id) values('p005','真维斯','200','c002');
insert into product(pid,pname,price,category_id) values('p006','花花公子','440','c002');
insert into product(pid,pname,price,category_id) values('p007','劲霸','2000','c002');
insert into product(pid,pname,price,category_id) values('p008','香奈儿','800','c003');
insert into product(pid,pname,price,category_id) values('p009','相宜本草','200','c003');

3. 添加数据报错（1366 - Incorrect string value: '\xE5\xAE\xB6\xE7\x94\xB5' for column 'cname' at row 1）
运行 alter table `表名` convert to character set utf8;

4. 更新数据
UPDATE user SET token=null,token_time=null WHERE token='47dcd432fd2c6e70907c880a07bfaa65';

5. 分页查询
SELECT author,updata_time,create_time,article_id,title,article_type from article_table Order by create_time desc LIMIT 0,2;
// 分页查询 LIMIT (page*size),size;
// Order by create_time desc  降序
// Order by create_time asc   升序

6. 分页总计
SELECT COUNT(*) as total FROM article_table;

7. 数据删除 
DELETE FROM category WHERE categoryName='${option.categoryName}' AND categoryId='${option.categoryId}';


https://www.cnblogs.com/wjw1014/p/10851218.html
```

### 数据查询
```
1. 内连接查询
隐式内连接
select * from category c,product p where c.cid = p.category_id;
显式内连接
SELECT * FROM category INNER JOIN product ON cid=category_id;
SELECT * FROM category JOIN product ON cid=category_id;

2. 外连接查询
左外连接：left outer join
SELECT * FROM category LEFT JOIN product ON cid=category_id;
右外连接 right outer join
SELECT * FROM category RIGHT JOIN product ON cid=category_id;
```
