let http = require('http');


let fs = require('fs');

let path = require('path');

let mime = require('mime');
let server = http.createServer();
server.listen(3000,()=>{
	console.log('服务器已经启动');
});
server.on('request',(req,res) => {
	// req.url就是用户的请求地址
	// 
	
	// 根据用户请求的地址不同 来想用到不同的页面


	// if(req.url == 'index.html'){

	// }else if(req.url == 'logo.html'){

	// }
	// 判断需要的内容进行判断响应
	// 
	// 
	// console.log(req.url);
	if(req.url == '/'){
		// 默认响应首页
		// 
		// 
		res.writeHeader(200,{
			'Content-Type': 'text/html; chatset=utf-8'

		});

		// 读取 index.html 的内容 然后将读取到的内容响应给用户
		fs.readFile('./index.html', 'utf-8', (err,data)=>{
			// utf-8 不用缓冲
			if(!err){
				res.write(data);
				res.end();
			}
		});
	}else{
		let realPath = path.join('./',req.url);
		// console.log(realPath);
		



		fs.readFile(realPath,(err,data)=>{
			if(!err){
				// 通过第三方模块mime可以获得不同类型的资源mime
				 //  通过命令行创建一个本地的然后用lookup方法

				 console.log(mime.getType(realPath));
			

				res.writeHeader(200,{
					'Content-Type':mime.getType(realPath) 
				});
				res.write(data);
				res.end();
			}
		})
	}
})