// http是一个系统模块
let http = require('http');

// 通过http模块可以创建一个HTTP服务器
// 类似于Apache
// 通过一系列的方法来创建
// 方法 createServer




// 通过createServer 得到一个服务器实例

let srever = http.createServer();

// 通过服务器实例 来处理请求和响应

// post get+ URL（地址  ）
        // 端口可以自己设置 常用3000
// get + localhost: 3000
// 通过服务器实例的listen 方法来实现端口的监听

server.listen(3000);  //端口只要没被占用就可以
//  node执行 后浏览器才会访问到

// 还要有响应 （异步比较好）
// 通过服务器实例的request事件来处理客户端（浏览器）
//   的请求 并根据情况作出响应
// 通过on方法来实现事件的监听

    // 第一个 req 表示请求 第二个 res 表示响应
server.on('request', (req,res)=> {
    console.log('有人访问');



    // 在回调函数中可以设置两个参数对应请求和响应
    res.writeHead('200',{
        'Content-type':'text/html;charset=utf-8'
    });
    res.write('hi');  //write类似于echo
    // 也可以多次write  乱码 要设置请求头
    res.write('hei'); 
    res.end(); //响应结束

    // 响应主体 res.write res.end();
});
// 每当改了node.js代码 需要重新启动

