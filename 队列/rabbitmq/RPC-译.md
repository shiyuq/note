# 远程程序调用（RPC）

## RPC调用

### （使用 amqp.node 客户端）

在第二个教程中我们学习了如何使用工作队列在多个工人之间分发耗时的任务。

但是如果我们需要在远程计算机上运行一个函数并等待函数的结果该怎么办？好吧，这是一个不同的故事。这种模式通常叫做`远程程序调用`或者是`RPC`。

在这个教程中，我们准备使用RabbitMQ来搭建一个RPC系统：一个客户机和一个可扩展的RPC服务机。由于我们没有任务耗时的任务来进行分发，所以我们打算创建一个返回斐波那契数字的虚拟RPC服务。

> **关于RPC的一个解释**
>
> 虽然RPC在计算中是一个非常常见的模式，但是它经常受批评。当程序员不了解一个函数调用是本地调用还是一个慢速的RPC调用时，问题就会随之出现。像这样的混淆导致了一个不可预测的系统，并且增加了调试的不必要的复杂程序，而不是简化软件，滥用RPC调用将会导致不明智的面条代码。
>
> 考虑到这一点，考虑下面的建议：
>
> * 哪个方法是本地的，哪个是远程的，需要确保显而易见。
> * 给你的系统添加文档，确保组件之间的依赖是相互独立的。
> * 处理错误情况。客户机在RPC服务器长时间无响应时应该怎么处理？
>
> 当你陷入疑问时，如果可以的话避免使用RPC，你可以使用一个异步管道——而不是RPC-就像锁住了一样，异步程序可以将结果异步地塞入到下一个阶段的返回中。

### 回调队列（callback queue）

通常来说，在RabbitMQ上实现RPC是容易的。一个客户机发送一个请求消息并且一个服务机回复响应消息。为了接收响应，我们需要发送一个带有`callback`队列的请求。我们可以使用默认的交换机，让我们来试试：

```JavaScript
channel.assertQueue('', {
  exclusive: true
});

channel.sendToQueue('rpc_queue', Buffer.from('10'), {
   replyTo: queue_name
});

# ... then code to read a response message from the callback queue ...
```

> **消息属性**
>
> AMQP 0-9-1协议通过消息预先定义了一组共14个属性。大部分的属性都很少使用，以下的属性除外：
>
> * `persistent`：将消息标记为持久(带有值`true`)或者非持久（`false`）。你可以从[教程二](https://www.rabbitmq.com/tutorials/tutorial-two-javascript.html)中记住这个属性。
> * `content_type`：哟过来描述编码的MIME类型。例如，对于经常使用的JSON编码，把它设置成`application/json`通常是很好的做法。
> * `reply_to`：通常用来命名一个回调队列。
> * `correlation_id`：用来将RPC响应和请求相关联。

### 关联ID（Correlation Id）

在上面呈现出来的方法中，我们建议为每个RPC请求都创建一个回调队列。这是非常低效的，但是幸运的是，我们有一个更好的方法——让我们每个客户端创建一个单个回调队列。

这会引起一个新的问题，在这个队列中接收到了响应，但是却不清库这个响应是属于哪个请求的。这就是`correlation_id`属性有用处的地方。我们准备给每一个请求都设置上独一无二的值。之后，当我们在回调队列中接收到一条消息时我们就会查看`correlation_id`属性，并且基于这个属性我们可以把一个请求和响应匹配起来。如果我们看到无值的`correlation_id`，我们将会安全地将这条消息丢弃——它不属于我们的请求。

你会问，为什么我们要忽略回调队列中未知的消息，而不是失败抛错？这是由于服务端的竞争条件的可能性。虽然不太可能，但是在请求发送一个确认消息之前，RPC服务器可能会在向我们发送回应后死掉。

如果这种情况发生了，重新启动的RPC服务器将会重新处理请求。这也就是为什么在客户端必须要优雅的处理重复的响应，并且RPC应该理想中是幂等的。

### 总结（Summary）

![img](https://www.rabbitmq.com/img/tutorials/python-six.png)

我们的RPC将会这样工作：

* 当客户端起起来时，它常见一个匿名的独有的回调队列。
* 对于RPC请求，客户端发送带有两个属性的消息：`reply_to`，它被设置为回调队列名并且还有，`correlation_id`，它被设置为每个请求的唯一值。
* 请求被发送到一个叫`rpc_queue`的队列
* RPC工作线程（又叫做：服务机）正在等待该队列的请求。当一个请求出现时，它会使用`reply_to`字段中的队列名来执行作业并将带有结果的消息发送给客户端。
* 客户端等待回调队列上的数据。当一条消息出现时，它校验`correlation_id`字段。如果它和请求中的`reply_to`字段一致，它将会返回对应用程序的响应。

### 把它们放到一起（Putting it all together）

斐波那契函数：

```javascript
function fibonacci(n) {
  if (n == 0 || n == 1)
    return n;
  else
    return fibonacci(n - 1) + fibonacci(n - 2);
}
```

我们申明了斐波那契函数，我们假设传入的都是有效的正整数。（不要指望这个可以用于大数字，并且这可能是最慢的递归实现了）。

我们的RPC服务端代码[rpc_server.js](https://github.com/rabbitmq/rabbitmq-tutorials/blob/master/javascript-nodejs/src/rpc_server.js)看起来是这样的：

```javascript
#!/usr/bin/env node

var amqp = require('amqplib/callback_api');

amqp.connect('amqp://localhost', function(error0, connection) {
  if (error0) {
    throw error0;
  }
  connection.createChannel(function(error1, channel) {
    if (error1) {
      throw error1;
    }
    var queue = 'rpc_queue';

    channel.assertQueue(queue, {
      durable: false
    });
    channel.prefetch(1);
    console.log(' [x] Awaiting RPC requests');
    channel.consume(queue, function reply(msg) {
      var n = parseInt(msg.content.toString());

      console.log(" [.] fib(%d)", n);

      var r = fibonacci(n);

      channel.sendToQueue(msg.properties.replyTo,
        Buffer.from(r.toString()), {
          correlationId: msg.properties.correlationId
        });

      channel.ack(msg);
    });
  });
});

function fibonacci(n) {
  if (n == 0 || n == 1)
    return n;
  else
    return fibonacci(n - 1) + fibonacci(n - 2);
}
```

服务端的代码十分简单：

* 像往常一样，我们先建立了一个连接，信道并且申明了队列。
* 我们可能希望裕兴多个服务端进程。为了在多个服务端上平均传播的负载，我们需要在信道上设置`prefetch`值。
* 我们使用`Channel.consume`来从队列中消费消息，这样我们可以进入我们完成工作的回调函数并发送回复。

我们的RPC客户端[rpc_client.js](https://github.com/rabbitmq/rabbitmq-tutorials/blob/master/javascript-nodejs/src/rpc_client.js)代码如下：

```JavaScript
#!/usr/bin/env node

var amqp = require('amqplib/callback_api');

var args = process.argv.slice(2);

if (args.length == 0) {
  console.log("Usage: rpc_client.js num");
  process.exit(1);
}

amqp.connect('amqp://localhost', function(error0, connection) {
  if (error0) {
    throw error0;
  }
  connection.createChannel(function(error1, channel) {
    if (error1) {
      throw error1;
    }
    channel.assertQueue('', {
      exclusive: true
    }, function(error2, q) {
      if (error2) {
        throw error2;
      }
      var correlationId = generateUuid();
      var num = parseInt(args[0]);

      console.log(' [x] Requesting fib(%d)', num);

      channel.consume(q.queue, function(msg) {
        if (msg.properties.correlationId == correlationId) {
          console.log(' [.] Got %s', msg.content.toString());
          setTimeout(function() {
            connection.close();
            process.exit(0)
          }, 500);
        }
      }, {
        noAck: true
      });

      channel.sendToQueue('rpc_queue',
        Buffer.from(num.toString()),{
          correlationId: correlationId,
          replyTo: q.queue });
    });
  });
});

function generateUuid() {
  return Math.random().toString() +
         Math.random().toString() +
         Math.random().toString();
}
```

现在是查看我们的全部示例代码的最好时机，[rpc_client.js](https://github.com/rabbitmq/rabbitmq-tutorials/blob/master/javascript-nodejs/src/rpc_client.js)和[rpc_server.js](https://github.com/rabbitmq/rabbitmq-tutorials/blob/master/javascript-nodejs/src/rpc_server.js)。

我们的RPC服务已经准别好了，现在我们可以启动服务了：

```bash
./rpc_server.js
# => [x] Awaiting RPC requests
```

提供一个斐波那契数字来运行客户端：

```bash
./rpc_client.js 30
# => [x] Requesting fib(30)
```

这里展示的设计不是唯一的RPC服务可能的实现，但是它有一些重要的优势：

* 如果RPC服务端过慢，你可以运行另一台来扩展加速。尝试在新的控制台中运行第二个`rpc_server.js`。
* 在客户端，RPC只需要发送和接收一条消息。因此，RPC客户端只需要一个单独的RPC请求的网络往返。

我们的代码依然十分简洁，并且没有尝试解决更加复杂（但是很重要）的问题，像：

* 如果没有服务器运行时，客户端该如何响应？
* 客户端是否应该为RPC持有某种类型的超时？
* 如果服务器发生故障并抛出异常，是否应该直接转给客户端？
* 在处理之前保护无效的传入消息（例如检查边界、类型）。

> 如果你想要体验，你会发现用于查询队列的[管理界面](https://www.rabbitmq.com/management.html)

