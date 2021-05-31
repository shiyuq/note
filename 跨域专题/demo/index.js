const express = require('express');

// 5001端口服务 将当前目录作为一个http服务
let port = 5001;
let app = express();
app.use(express.static(__dirname));
app.listen(port);

// 5002端口服务 返回接口数据
port = 5002;
app = express();
// 方案一：CORS 修改响应头
app.get('/cors', function (req, res) {
  // 设置允许的源
  res.header('Access-Control-Allow-Origin', '*');
  res.send('hello world!');
});

// 方案二：JSONP
app.get('/jsonp', function (req, res) {
  const cb = req.query.callback;
  res.send(`${cb}('hello world!')`);
});

// 方案三：NGINX
app.get('/nginx', function (req, res) {
  res.json({name: 'nginx', title: '反向代理'});
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
