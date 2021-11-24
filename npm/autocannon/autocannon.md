# autocannon

## 介绍

* 什么是 autocannon？

  在节点中编写的HTTP / 1.1基准测试工具，由WRK和WRK2提供极大的启发，支持HTTP流水线和HTTPS。在我的测试下，AutoCannon可以产生比WRK和WRK2更多的负载，请参阅有关详细信息的限制。

* 它的作用是什么？

  * 接口压测

* 地址

  [npm——autocannon](https://www.npmjs.com/package/autocannon)

  [github——autocannon](https://github.com/mcollina/autocannon)

* [下载](#下载)
* [用法](#用法)
* [接口](#接口)

## 下载

有两种使用方式

```bash
npm i autocannon -g
```

方式一：全局下载，可随处使用

```bash
npm i autocannon --save
```

方式二：以项目的依赖进行安装，可以在项目中使用`autocannon`提供的接口

## 用法

### 命令行

```
使用方式：autocannon [opts] URL
```

### 解释

这里假设您使用了第一种方式进行了全局安装，那么我们在终端中使用`autocannon`的时候可以直接使用`autocannon`命令

opts这里代表的是可选参数，代表您可以往命令中添加一些内容，做一些限制

URL就是您想要请求的接口的路径，是任何有效的HTTP或HTTPS的路径，一般我们的项目需要带上PORT，所以我们可以这样使用'http://localhost:${PORT}/path'，作为我们的接口路径

### options

| 可选参数                       | 详情说明                                                     |
| ------------------------------ | ------------------------------------------------------------ |
| -c/--connections NUM           | 要使用的并发连接数。默认值：10                               |
| -p/--pipelining NUM            | 使用流水线请求的数量。默认值：1                              |
| -d/--duration SEC              | 运行autocannon的秒数。默认值：10                             |
| -a/--amount NUM                | 退出基准之前的请求次数。如果设置，则忽略 -d/--duration       |
| -S/--socketPath                | UNIX域套接字或Windows命名管道的路径。仍然需要URL来发送正确的主机标头和路径 |
| -w/--workers                   | 用于连续请求的工作线程数                                     |
| -W/--warmup                    | 在开始采样之前使用热间隔，这使得启动过程能够完成并且在采样开始之前进行标准化<br /> 使用 -c 和 -d 等参数 比如：`--warmup [ -c 1 -d 3 ]` |
| --on-port                      | 可以使用该参数来指定监听的端口，然后URL是不可以省略的，但是你可以不用写`localhost` |
| -m/--method METHOD             | HTTP 方法。默认值：GET                                       |
| -t/--timeout NUM               | 超时和重置连接的秒数。默认值：10                             |
| -T/--title TITLE               | 标题在结果中放置识别                                         |
| -b/--body BODY                 | 请求的主体，当你要使用这个参数时，最好配合`-H/--headers`一起使用，如果你的接口需要某些header中的参数 |
| -F/--form FORM                 | 上传表单（multipart/form-data）。表单选项可以是json字符串    |
| -i/--input FILE                | 请求的主体                                                   |
| -H/--headers K=V               | 请求头                                                       |
| --har FILE                     | 如果设置了此参数，AutoCannon将使用来自har文件的请求          |
| -B/--bailout NUM               | 发起救助前的故障次数                                         |
| -M/--maxConnectionRequests NUM | 每个连接到服务器的最多请求次数                               |
| -O/--maxOverallRequests NUM    | 最大请求向服务器进行总体的请求次数                           |
| -r/--connectionRate NUM        | 从单个连接中每秒发出的最大请求次数                           |
| -R/--overallRate NUM           | 来自所有连接每秒的最大请求次数                               |
| -C/--ignoreCoordinatedOmission | 使用“ConnectionRate”或“SalialRate”以固定速率发送时可以忽略协调疏忽问题 |
| -D/--reconnectRate NUM         | 重置对服务器的连接前的请求数                                 |
| -n/--no-progress               | 不要渲染进度栏。默认值：false                                |
| -l/--latency                   | 打印所有延迟数据。默认值：false                              |
| -I/--idReplacement             | 启用在请求主体中塞入随机生成的ID[<id>]。默认值：false        |
| -j/--json                      | 将输出打印为换行符分隔JSON。这将导致进度条和不呈现的结果。默认值：false |
| -f/--forever                   | 永远运行基准。在完成时有效重新启动基准。默认值：false        |
| -s/--servername                | SNI的服务器名称（服务器名称指示）TLS扩展名。默认为URL而不是IP地址的主机名 |
| -x/--excludeErrorStats         | 从每秒最终延迟和字节排除错误统计信息（非2xx HTTP响应）。默认值：false |
| -E/--expectBody EXPECTED       | 确保主体匹配此值。如果已启用，则不匹配计数朝向救助           |
| --renderStatusCodes            | 打印状态代码及其各自的统计信息                               |
| --debug                        | 将连接错误打印到stderr                                       |
| -v/--version                   | 打印版本号                                                   |
| -h/--help                      | 打印命令帮助菜单                                             |
|                                |                                                              |

### autocannon的输出格式

```tree
Running 10s test @ http://localhost:3000
10 connections

┌─────────┬──────┬──────┬───────┬──────┬─────────┬─────────┬──────────┐
│ Stat    │ 2.5% │ 50%  │ 97.5% │ 99%  │ Avg     │ Stdev   │ Max      │
├─────────┼──────┼──────┼───────┼──────┼─────────┼─────────┼──────────┤
│ Latency │ 0 ms │ 0 ms │ 0 ms  │ 1 ms │ 0.02 ms │ 0.16 ms │ 16.45 ms │
└─────────┴──────┴──────┴───────┴──────┴─────────┴─────────┴──────────┘
┌───────────┬─────────┬─────────┬─────────┬─────────┬─────────┬─────────┬─────────┐
│ Stat      │ 1%      │ 2.5%    │ 50%     │ 97.5%   │ Avg     │ Stdev   │ Min     │
├───────────┼─────────┼─────────┼─────────┼─────────┼─────────┼─────────┼─────────┤
│ Req/Sec   │ 20623   │ 20623   │ 25583   │ 26271   │ 25131.2 │ 1540.94 │ 20615   │
├───────────┼─────────┼─────────┼─────────┼─────────┼─────────┼─────────┼─────────┤
│ Bytes/Sec │ 2.29 MB │ 2.29 MB │ 2.84 MB │ 2.92 MB │ 2.79 MB │ 171 kB  │ 2.29 MB │
└───────────┴─────────┴─────────┴─────────┴─────────┴─────────┴─────────┴─────────┘

Req/Bytes counts sampled once per second.

251k requests in 10.05s, 27.9 MB read
```

上面两张表格，一张表示的是请求延迟，还有一张表示的是请求体量

我们可以来描述一下上面表格的意义

| stat（统计）                         | avg（平均值） | stdev（标准差） | Max（最大值） |
| ------------------------------------ | ------------- | --------------- | ------------- |
| 耗时(毫秒)/(Latency)                 | 3086.81       | 1725.2          | 5554          |
| 吞吐量(请求/秒)/(Req/Sec——QPS)       | 23.1          | 19.18           | 65            |
| 每秒传输量(字节/秒)/(Bytes/Sec——BPS) | 237.98 kB     | 197.7 kB        | 688.13 kB     |

当你使用`-l`参数的时候，第三张表就会列出autocannnon记录的所有延迟百分比

```tree
┌────────────┬──────────────┐
│ Percentile │ Latency (ms) │
├────────────┼──────────────┤
│ 0.001      │ 0            │
├────────────┼──────────────┤
│ 0.01       │ 0            │
├────────────┼──────────────┤
│ 0.1        │ 0            │
├────────────┼──────────────┤
│ 1          │ 0            │
├────────────┼──────────────┤
│ 2.5        │ 0            │
├────────────┼──────────────┤
│ 10         │ 0            │
├────────────┼──────────────┤
│ 25         │ 0            │
├────────────┼──────────────┤
│ 50         │ 0            │
├────────────┼──────────────┤
│ 75         │ 0            │
├────────────┼──────────────┤
│ 90         │ 0            │
├────────────┼──────────────┤
│ 97.5       │ 0            │
├────────────┼──────────────┤
│ 99         │ 1            │
├────────────┼──────────────┤
│ 99.9       │ 1            │
├────────────┼──────────────┤
│ 99.99      │ 3            │
├────────────┼──────────────┤
│ 99.999     │ 15           │
└────────────┴──────────────┘
```

如果发送了很多（数百万）的请求，这可以提供更多的洞察力

### 程序化

```javascript
'use strict'

const autocannon = require('autocannon')

autocannon({
  url: 'http://localhost:3000',
  connections: 10, //default
  pipelining: 1, // default
  duration: 10 // default
}, console.log)

// async/await
async function foo () {
  const result = await autocannon({
    url: 'http://localhost:3000',
    connections: 10, //default
    pipelining: 1, // default
    duration: 10 // default
  })
  console.log(result)
}
```

您可以使用第二种方式将压测的工作放在程序中来完成

## 接口

[具体请查看对应API接口](https://github.com/mcollina/autocannon#api)

## 全局方法的使用介绍

step1：我们可以使用nodejs+express搭建一个简易的服务器，并且提供一个简单的post接口提供请求使用，假设我们提供了post一个接口，路径为 /user/test，然后我们使用autocannon进行压测

```bash
autocannon -c 20 -d 5 -p 1 -m POST http://localhost:6001/user/test
```

然后来看下结果

```
Running 5s test @ http://localhost:6001/user/test
20 connections

┌─────────┬───────┬───────┬───────┬───────┬──────────┬─────────┬────────┐
│ Stat    │ 2.5%  │ 50%   │ 97.5% │ 99%   │ Avg      │ Stdev   │ Max    │
├─────────┼───────┼───────┼───────┼───────┼──────────┼─────────┼────────┤
│ Latency │ 12 ms │ 15 ms │ 26 ms │ 47 ms │ 16.35 ms │ 8.91 ms │ 140 ms │
└─────────┴───────┴───────┴───────┴───────┴──────────┴─────────┴────────┘
┌───────────┬─────────┬─────────┬────────┬─────────┬─────────┬────────┬─────────┐
│ Stat      │ 1%      │ 2.5%    │ 50%    │ 97.5%   │ Avg     │ Stdev  │ Min     │
├───────────┼─────────┼─────────┼────────┼─────────┼─────────┼────────┼─────────┤
│ Req/Sec   │ 1024    │ 1024    │ 1161   │ 1364    │ 1185.8  │ 141.87 │ 1024    │
├───────────┼─────────┼─────────┼────────┼─────────┼─────────┼────────┼─────────┤
│ Bytes/Sec │ 1.15 MB │ 1.15 MB │ 1.3 MB │ 1.53 MB │ 1.33 MB │ 159 kB │ 1.15 MB │
└───────────┴─────────┴─────────┴────────┴─────────┴─────────┴────────┴─────────┘

Req/Bytes counts sampled once per second.

6k requests in 5.03s, 6.65 MB read
```

上面表示的是设置了20个并发连接数，疯狂给`http://localhost:6001/user/test`接口发送POST请求，维持5s，只有一个pipeline流水线，主动申明使用的是POST方法，因为没有用到请求体，所以暂时没有设置

然后我们可以看到日志打印如下

```bash
[2021-11-24T18:00:18.256] [INFO] apiLog - 请求 {
  eventType: 'request',
  http: {
    method: 'POST',
    statusCode: 200,
    responseTime: 1,
    responseStatus: null,
    responseMessage: null
  },
  context: {
    reqId: '9b01de51-febe-4c17-9ebe-d2aa8a11ef91',
    userId: '0000000000000000000'
  },
  ip: '127.0.0.1',
  url: '/user/test',
  body: '{}',
  query: '{}',
  responseBody: 'null'
}
[2021-11-24T18:00:18.257] [INFO] apiLog - 请求 {
  eventType: 'request',
  http: {
    method: 'POST',
    statusCode: 200,
    responseTime: 0,
    responseStatus: null,
    responseMessage: null
  },
  context: {
    reqId: '18f6d190-fdde-4035-85fc-81985b439c43',
    userId: '0000000000000000000'
  },
  ip: '127.0.0.1',
  url: '/user/test',
  body: '{}',
  query: '{}',
  responseBody: 'null'
}
......
......
......
```

step2：当我们加上一些必要参数的校验时

```bash
autocannon -c 20 -d 5 -p 1 -m POST -H "Content-Type":"application/json" -b '{"name": "shiyuq", "password": "ceshi"}' http://localhost:6001/user/test
```

我们需要加上`-H`来添加一些头部信息以及请求体的参数

然后我们可以看到日志打印如下

```bash
[2021-11-24T18:24:16.551] [INFO] apiLog - 请求 {
  eventType: 'request',
  http: {
    method: 'POST',
    statusCode: 200,
    responseTime: 1,
    responseStatus: null,
    responseMessage: null
  },
  context: {
    reqId: '1c7c1b32-4286-4319-bfcd-a89a98e9f8ec',
    userId: '0000000000000000000'
  },
  ip: '127.0.0.1',
  url: '/user/test',
  body: '{"name":"shiyuq","password":"ceshi"}',
  query: '{}',
  responseBody: 'null'
}
[2021-11-24T18:24:16.551] [INFO] apiLog - 请求 {
  eventType: 'request',
  http: {
    method: 'POST',
    statusCode: 200,
    responseTime: 0,
    responseStatus: null,
    responseMessage: null
  },
  context: {
    reqId: '80480641-423c-4f3d-9bc6-96914a7c673f',
    userId: '0000000000000000000'
  },
  ip: '127.0.0.1',
  url: '/user/test',
  body: '{"name":"shiyuq","password":"ceshi"}',
  query: '{}',
  responseBody: 'null'
}
......
```

我们可以看到body体中有了请求体中塞入的json数据

step3：我们可以尝试使用`-a`命令，表示退出压测的请求数

```bash
autocannon -c 1 -a 1 -d 5 -p 1 -m POST -H "Content-Type":"application/json" -b '{"name": "shiyuq", "password": "ceshi"}' http://localhost:6001/user/test
```

可以查看终端中的结果

```tree
Running 1 requests test @ http://localhost:6001/user/test
1 connections

┌─────────┬──────┬──────┬───────┬──────┬──────┬───────┬──────┐
│ Stat    │ 2.5% │ 50%  │ 97.5% │ 99%  │ Avg  │ Stdev │ Max  │
├─────────┼──────┼──────┼───────┼──────┼──────┼───────┼──────┤
│ Latency │ 6 ms │ 6 ms │ 6 ms  │ 6 ms │ 6 ms │ 0 ms  │ 6 ms │
└─────────┴──────┴──────┴───────┴──────┴──────┴───────┴──────┘
┌───────────┬─────────┬─────────┬─────────┬─────────┬─────────┬───────┬─────────┐
│ Stat      │ 1%      │ 2.5%    │ 50%     │ 97.5%   │ Avg     │ Stdev │ Min     │
├───────────┼─────────┼─────────┼─────────┼─────────┼─────────┼───────┼─────────┤
│ Req/Sec   │ 1       │ 1       │ 1       │ 1       │ 1       │ 0     │ 1       │
├───────────┼─────────┼─────────┼─────────┼─────────┼─────────┼───────┼─────────┤
│ Bytes/Sec │ 1.12 kB │ 1.12 kB │ 1.12 kB │ 1.12 kB │ 1.12 kB │ 0 B   │ 1.12 kB │
└───────────┴─────────┴─────────┴─────────┴─────────┴─────────┴───────┴─────────┘

Req/Bytes counts sampled once per second.

1 requests in 1.02s, 1.12 kB read
```

然后查看日志打印结果

```bash
[2021-11-24T18:28:32.005] [INFO] apiLog - 请求 {
  eventType: 'request',
  http: {
    method: 'POST',
    statusCode: 200,
    responseTime: 0,
    responseStatus: null,
    responseMessage: null
  },
  context: {
    reqId: '704881b2-fc89-4429-9686-fab3981f65bb',
    userId: '0000000000000000000'
  },
  ip: '127.0.0.1',
  url: '/user/test',
  body: '{"name":"shiyuq","password":"ceshi"}',
  query: '{}',
  responseBody: 'null'
}
```

可见，当设置了`-a`参数时，`-a 1`表示请求达到1次时退出压测

当然还有其他很有趣的命令，你们可以依次尝试

