
let express = require('express');

let app = express();
// 设置路径 是个方法 进行设置（set） 模板目录
app.set('views','./views');  //设置模板目录为当前下的views
// 使用模板引擎 后缀是xtpl 不需要手动引入 express 内部负责自动引入 
app.set('view engine','xtpl');// 

app.listen(3000);

// express.static() 专门处理静态资源
app.use(express.static('public'));//使用 方法

// express 没有内置模板引擎但是他非常方便的支持其他的模板
//  xtpl模板 npm install xtpl下载  xtemplate（内部）

// 浏览器 客户端 以get方式请求

app.get('/', (req,res)=>{
    // res.send('你好 张先生！');  //封装的响应 相当于res.write和res.end
// 参数 模板名字 
      
});
// 在这里就是处理路由了 比以前的更加详细
app.get('/add',(req,res)=>{
    res.render('add',{});
});

app.get('/list',(req,res)=>{
    res.render('list',{});
})

app.post('/add',(req,res)=>{
    res.send('略略略');
});