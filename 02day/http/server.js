// 通过系统模块创建http服务器

let http = require('http');
let url = require('url');
let querystring = require('querystring');

// 通过createServer 可以创建服务器实例
// 
let server = http.createServer();


// 通过 listen 家庭一个端口
// 
server.listen(3000,(arr)=>{
	console.log('监听3000端口');
});


server.on('request',(req,res) => {


	// 请求  请求行 请求头 请求主体
	// 
	// 请求行  =   请求方式  +  请求地址
	// 
	// 
	// 
	// 通过req.method 可以获得请求方式
	// console.log('你请求的方式为', req.method);


// 请求地址
	console.log('请求地址是',req.url);


// 请求头
	// console.log('请求头', req.headers);


	// 请求方式为post时才会有请求主体 （主要的是参数）

	// 请求方式是get时 没有请求主体 参数放在地址上
	// 
	
// 		如果get方式请求 可以通过解析地址获得参数
// nodejs 提供专门的URL系统模块解析地址上的参数
	// let params = url.parse(req.url,true);
	// console.log(params);

	// 当数据使用post方式上传是会触发一个data事件 
	var formData = '';
	req.on('data',(chunk)=>{
		formData += chunk;
	});
	// 当post数据传输完毕时会触发另一个end事件 
	req.on('end',()=>{
		// 得到的数据是一个字符串 可以使用系统模块querystring 来解析
		
		console.log(formData);


		let params = querystring.parse(formData);
		console.log(params);
	});
	










	// 
	// 请求头  键值对
// 		 请求主图get方式没有请求主体 post有
// 		 
		 
		 
		 
		 
	res.end();
}) 