let http = require('http');


let fs = require('fs');

let path = require('path');

let mime = require('mime');
let server = http.createServer();
server.listen(3000,()=>{
	console.log('服务器已经启动');
});
server.on('request',(req,res) => {

	if(req.url == '/'){
		// 默认响应首页
		
		res.writeHeader(200,{
			'Content-Type': 'text/html; chatset=utf-8'

		});

		fs.readFile('./doc.html', 'utf-8', (err,data)=>{
		
			if(!err){
				res.write(data);
				res.end();
			}
		});
	}else{
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
		})
	}
})
