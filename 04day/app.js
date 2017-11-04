let http = require('http');

let url = require('url');

let db = require('./config/db');

let path = require('path');

let fs = require('fs');

let mime = require('mime');


let template = require('art-template');
template.defaults.root = './views';
template.defaults.extname = '.html';
template.defaults.rules[1].test = /##([@#]?)[ \t]*(\/?)([\w\W]*?)[ \t]*##/;

let app = http.createServer();

app.listen(3000,(err)=>{
	if(!err){
		console.log('服务器已开启');
	}
})

app.on('request',(req,res)=>{
	let {pathname, query} =url.parse(req.url,true);

	res.render = function(tpl,data){
		let html = template(tpl,data);

		res.writeHeader(200,{
			'Content-Type':'text/html;chartset=utf-8'
		})
		res.end(html);

	}
	switch(pathname){
		case '/':
		case '/index':
			db.query('select * from lists',(err,rows)=>{
				if(!err){
					res.render('index',{lists:rows});
				}
			});
			
		break;

		case '/create':
			query.no = Math.ceil(Math.random() * 100000);
			query.datetime = new Date();

			db.query('insert into lists set ?',query,(err,info)=>{
				if(!err){
					res.writeHeader('200',{
						'Content-Type':'application/jion'
					})

					res.end(JSON.stringify({
						code:10000,
						msg:'添加成功',
						result:query
					}));
				}
			});
		break;

		default:
			let realPath = path.join('./public',pathname);
			fs.readFile(realPath,(err,data)=>{
				if(!err){
					res.writeHeader(200,{
						'Content-Type':mime.getType(realPath)
					})
					res.end(data);
				}
			})



	}

})