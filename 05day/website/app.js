
let express = require('express');
let bodyParser = require('body-parser');

let app = express();
app.listen(3000);
app.set('view engine','xtpl');

app.set('views','./views');

app.use(express.static('public'));


// 使用中间件来解析post的数据
// 会添加一个req.body属性
// app.use(bodyParser.urlencoded());

app.get('/',(req,res)=>{
    // res.render('index',{});
    console.log(req.query);  //获得对象形式的信息   //是express的封装处理
});
app.get('/doc',(req,res)=>{
    res.render('doc',{});
});
app.get('/blog',(req,res)=>{
    res.render('blog',{});
});


// 路由
app.post('/',(req,res)=>{
    // 如果要解析post的参数 需要使用一个中间件 body-parser
    // body-parser 是一个第三方插件
    res.send('post请求方式');
})




















