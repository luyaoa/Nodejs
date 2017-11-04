// y引入express 下载
let express = require('express');
let bodyParser = require('body-parser');

let session = require('express-session');


// 使用 express
let app = express();

// 监听端口3000
app.listen(3000);


// 引入文件 下载 xtpl xtemplate
app.set('view engine', 'xtpl');
// 动态页面
app.set('views', './views');
// 静态文件
app.use(express.static('./public'));

app.use('/public',express.static('./public'));

// 解析post 数据的中间件
app.use(bodyParser.urlencoded({extended: false}));

// 处理session的中间件 
/* 当使用了session 中间件后 
就在req上添加了一个session属性
 通过这个属性可以实现设置和读取session
  有点类似于PHP的$_SESSION*/
app.use(session({
    secret: 'fad',
    resave: false,
    saveUninitialized : false
}));

app.use('/admin',(req,res,next)=>{
    // 检测登录
    if(!req.session.loginfo && req.url != '/login'){
        // return res.redirect('/login');
    }
    next();
})

// 路由
// 使用express.Router() 创建主路由
// 主路由可以作为是一个中间件
// 主路由下开出子路由

// 创建子路由
let admin = require('./routes/admin');
let home = require('./routes/home');



// 使用后台路由
app.use('/admin', admin);
// 使用前台路由
app.use('/', home);