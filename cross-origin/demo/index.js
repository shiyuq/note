const express = require('express');
let app = express();
let port;

// 5001端口服务 将当前目录作为一个http服务
port = 5001;
app.use(express.static(__dirname));
app.listen(port);

// 5002端口服务 返回接口数据
port = 5002;
// 方案一：CORS 修改响应头
app.get('/cors', function (req, res) {
  // 设置允许的源
  whiteList = [ 'http://localhost:5001' ];
  if (req.headers.origin && whiteList.indexOf(req.headers.origin) >= 0) {
    res.header('Access-Control-Allow-Origin', req.headers.origin);
  }
  res.header('Access-Control-Allow-Headers', 'Origin, Content-Type, Content-Length, Authorization, Accept, X-Requested-With, Token, Accept-Encoding')
  res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
  res.header("X-Powered-By", ' 3.2.1')
  res.header("Content-Type", "application/json;charset=utf-8");
  res.json({name: 'hello world!'});
});

// 方案二：JSONP
app.get('/jsonp', function (req, res) {
  // 操作一
  // const cb = req.query.callback;
  // res.send(`${cb}('hello world!')`);

  // 操作二
  app.set('jsonp callback name', 'callback'); // 回调名称
  res.jsonp({ name: 'hello world!' });

  // 操作三
  // const jsonpCallback = app.get('jsonp callback name');
  // const jsonp = req.query[jsonpCallback];
  // if (jsonp) {
  //   res.jsonp({ name: 'hello world!' });
  // } else {
  //   res.status(404).send();
  // }
});

// 方案三：NGINX
app.get('/nginx', function (req, res) {
  res.json({name: 'nginx', title: '反向代理'});
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
