let http = require('http');

let url = require('url');

let fs = require('fs');

let path = require('path');

let server = http.createServer();

server.listen(3000);

server.on('request',(req,res)=>{
	// 路由是地址和程序之间的映射关系
	//   pathname   路由是开发人员设计的
	// 通过req.url 可以获取地址(不包含参数 参数是随时变化的)
	
	let {pathname} = url.parse(req.url);

	let realPath = path.jion('./',pathname);

	res.render = function(tpl){
		fs.readFile(tpl + '.html',(err,data)=>{
			res.write(data);
			res.end();
		} )
	}




	switch(pathname){
		case '/':    //这个路径显示 哪个页面
			console.log('a路由');
			res.write(data);
			
		break;

		case '/':    //这个路径显示 哪个页面

			fs.readFile('dlog.html',(err,data)=>{
				res.write(data);
				res.end();
			})
		break;


		case '/':    //这个路径显示 哪个页面

			fs.readFile('doc.html',(err,data)=>{
				res.write(data);
				res.end();
			})

		break;
		

		default:

			fs.readFile(realPath,(err,data)=>{
				if(!err){
					res.write(data);
					res.end();
				}
			})

	}




})