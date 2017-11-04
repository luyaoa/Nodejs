// 通过系统模块创建http服务器

let http = require('http');


// 通过createServer 可以创建服务器实例
// 
let server = http.createServer();


// 通过 listen 监听一个端口
// 
server.listen(3000);
//通过事件监听吃力请求和响应
//通过on 实现时间监听
server.on('request',(req,res) => {
	res.writeHead(200,{
		'Content-Type': 'text/html; chatset = utf-8'
	});

	res.write('你好 ');

	res.end();
}) 