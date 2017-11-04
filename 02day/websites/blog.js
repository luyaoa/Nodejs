


let http = require('http');

let fs = require('fs');  //文件系统 filesystem

let path = require('path');    //path 拆分字符串变成json 便于拼接路径

let mime = require('mime'); //第三方模块

let server = http.createServer();

server.listen(3000,()=>{
	console.log('开启服务器')
}) ;

server.on('request',(req,res)=>{
	if(req.url == '/'){
		res.writeHeader(200,{
			'Content-Type': 'text/html;charset=utf-8'
		});
		fs.readFile('./blog.html','utf-8', (err,data)=>{
			if(!err){
				res.write(data);
				res.end();
			}
		});
	}else {
		let realPath = path.join('./',req.url);


		fs.readFile(realPath,(err,data)=>{
			if(!err){

				console.log(mime.getType(realPath));
				res.writeHeader(200,{
					'Content-Type':mime.getType(realPath)
				});
				res.write(data);
				res.end();
			}
		});

	}
});