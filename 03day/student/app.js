let http = require('http');

let url = require('url');

let path = require('path');

let fs = require('fs');

let db = require('./database/students.json');
// npm install art-template 
let template = require('art-template');
template.defaults.root = './views';
template.defaults.extname = '.html';




let app = http.createServer();
app.listen(3000,(err)=>{
    if(!err){
        console.log('服务器已启动');
    }
});
app.on('request',(req,res)=>{
    // 路径
    let {pathname} = url.parse(req.url);

    let realPath = path.join('public',pathname); 

    res.render = function(tpl,data){

        let html = template(tpl,data);
        res.end(html);
    }


    switch(pathname){
        case '/':
        case '/add':
            res.render('add',{});
        break;

        case '/list':
            res.render('list',{list:db});
        break;

        case '/create':
            let {query} = url.parse(req.url,true);
            db.push(query);
            fs.writeFile('./database/students.json',JSON.stringify(db),(err)=>{
                if(!err){
                    res.writeHead(302,{
                        'Location':'/list'
                    })
                }
                res.end();
            })

        break;





        default:
            // console.log(pathname);
            // console.log(realPath);//真实路径

            fs.readFile(realPath,(err,data)=>{
                // res.write();//只接受字符类型还有buffoon

                if(!err){
                    res.end(data);
                }

            });

    }

})



