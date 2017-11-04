
let express = require('express');

let app = express();
app.listen(3000);
app.set('view engine','xtpl');

app.set('views','./views');

app.use(express.static('public'));

// 在express中 设计了中间件  就是指在请求和响应中间阶段对请求和响应做出一系列的逻辑
// 通use()方法实现
// use方法可以支持两个参数 
app.use((req,res,next)=>{
    req.zyh='张先生';//动态追加属性
    res.sss = '张洢豪';
    next();//将请求和响应传递给下一中间件 如果不调用next 那么下一中间件会持续等待


});
// 中间件的本质就是一个函数 这个函数可以接收到请求和响应并在向此函数内部处理请求和响应的逻辑
/*常见写法
function static(){
    return function(){}
};
app.use(static());*/


/* 特点
    next();//将请求和响应传递给下一中间件 如果不调用next 那么下一中间件会持续等待
    关于顺序：
        如果上游没有下游也不会有

        中间件支持路由 只有在路由里才会执行里面的逻辑
        app.use('/add',(req,req,next)=>{
            req.demo='张洢豪';
            res.text = '老小数点';
            next();
        })

    app.use(()=>{});//指所有路由

*/
app.get('/',(req,res)=>{
    res.render('index',{});
});










// 对整个请求响应处理的逻辑叫中间件
//  我们自己定义 的 请求开始是上游 请求尾部是下游 响应类似
//  在上游做的处理下游可以看见

