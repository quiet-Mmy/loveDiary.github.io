import express from 'express';
import bodyParser from 'body-parser';//获取post请求的参数
import cors from 'cors';//中间件
import mysql from 'mysql';

const app = express();
const port = 3001; // 定义端口号

app.use(bodyParser.json());
app.use(cors());

// 结合MySQL数据库
const connection = mysql.createConnection({
  host: 'localhost',//连接数据库
  user: 'root',//账号
  password: 'root',//密码
  database: 'list',// 数据名称
  port: 3306, // 正确的端口号定义
});

// 建立数据库链接
connection.connect((err) => {
  if (err) {
    console.error('连接数据库失败', err);
    return;
  }
  console.log('数据库连接成功');

  // 在这里执行测试查询  Test query result: 2为连接成功
  connection.query('SELECT 1 + 1 AS result', (err, rows) => {
    if (err) {
      console.error('查找失败:', err);
      return;
    }
    console.log('查找成功:', rows[0].result);
  });
});


// 解决跨域
app.all("*", function (req, res, next) {
  //设置允许跨域的域名，*代表允许任意域名跨域
  res.header("Access-Control-Allow-Origin", "*");
  //允许的header类型
  res.header("Access-Control-Allow-Headers", "content-type");
  //跨域允许的请求方式
  res.header("Access-Control-Allow-Methods", "DELETE,PUT,POST,GET,OPTIONS");
  next();
});

// 测试是否连接成功
app.post('/', (req, res) => {
  console.log(req,'req');
  res.send({
    data: '连接成功',
    status: 200
  });
});

// 编写接口格式  
// /user 路径
app.get('/get_user', (req, res) => {
  // 查询 age imgUrl text userName  （FROM user 代表的是当前你要访问那张表）
  connection.query('SELECT * FROM user', (err, rows, fields) => { // 指定具体列名
  // connection.query('SELECT age, imgUrl,text, userName FROM user', (err, rows, fields) => { // 指定具体列名
    if (err) {
      console.error('Error executing query:', err);
      return res.status(500).send({ error: 'An error occurred--查找错误' });
    }
    res.send({
      data: rows,
      status: 200
    });
  });
});

// 启动服务器
app.listen(port, () => {
  console.log(`服务启动${port}----Server started on port 3001`);
});
