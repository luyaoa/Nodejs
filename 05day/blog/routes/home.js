let express = require('express');
// 处理用户数据
let user = require('../models/user');

// 处得博客文章数据
let post = require('../models/post');

// 前台主路由
let home = express.Router();


// 前台首页
home.get('/',(req,res)=>{
//    每页两条数据
    let pageSize = 2;
    // 当前页
    let page = req.query.page || 1;

    post.count((err,rows)=>{
        if(!err) return;

        let total = row.total;
        let pages = Math.ceil(total / pageSize);

        post.findAll(pageSize,page,(err,rows)=>{
            console.log(rows);
            if(!err){
                res.render('home/index',{
                    posts:rows,
                    pages: pages,
                    page: page
                });
            }
        });       
    });
});


// 文章
home.get('/article',(req,res)=>{
    // 获取文件信息
    post.find(req.query.id,(err,rows)=>{
        if(!err){
            res.render('home/article',{post: rows[0]});
        }
    });   
}); 




// 主路由可以单独开出来一个文件 也要引用express
// 引多少都没关系  会自动当一个处理
//  路由开放出来
// 注册
home.get('/register',(req,res)=>{
    res.render('home/register',{});
})
// 登录
home.get('/login',(req,res)=>{
    res.render('home/login',{});
});



// 注册用户
home.post('/register',(req,res)=>{
//    获取前端的表单数据
    // console.log(req.body);

    // 调用模型 插入数据库
    user.insert(req.body,(err)=>{
        if(!err){
            res.json({
                code:10000,
                msg: '添加成功'
            });
        }
    });
});

// 用户登录
home.post('/login',(req,res)=>{
    console.log(req.body);

    user.auth(req.body.email,req.body.pass,(err,row)=>{
        if(!err){
            req.session.loginfo = row;

            res.json({
                code:10000,
                msg:'登录成功'
            });
        }
    });
});
module.exports = home;