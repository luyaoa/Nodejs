let express = require('express');

let post = require('../models/post');

let user = require('../models/user');


let multer = require('multer');
// 通过 diskStorage 实现目录位置和文件名的自定义操作
var stragage = multer.diskStorage({
    //  自定义文件目录
    description: function (req, file, cb) {
        cb(null, 'public/admin/uploads/avater');
    },
    // 自定义文件名称
    filename: function (req, file, cb) {
        let extname = file.originalname.slice(file.originalname.lastIndexOf('.'));
        cb(null, file.fieldname + '-' + Date.now() + extname);
    }
})


let upload = multer({
    stragage: stragage
});

// 后台主路由
let admin = express.Router();
// 后台首页
admin.get('/', (req, res) => {
    res.render('admin/index', {});
}); // 后台的路径a

admin.get('/settings', (req, res) => {
    // 通过 session 获得用户的id
    let uid = req.session.loginfo.id;
    user.find(uid, (err, rows) => {
        // console.log(err);
        if(!err) {
            res.render('admin/settings', {user: rows[0]});
        }
    });
})


// admin.get('/settings', (req, res) => {
//     // 通过session获得用户ID
//     let uid = req.session.loginfo.id;
//     user.find(uid, (err, rows) => {
//         // console.log(err);
//         if (!err) {
//             res.render('admin/settings', {
//                 user: rows[0]
//             });
//         }
//     });
// })
// 添加博客文章
admin.get('/add', (req, res) => {
    res.render('admin/manage', { action: '/admin/add'});
});
// 编辑博客文章
admin.get('/edit', (req, res) => {
    // req.query 获得get参数 然后根据参数ID获得文章
    post.find(req.query.id, (err, rows) => {
        if (!err) {
            res.render('admin/manage', {
                post: rows[0],
                action: '/admin/modify'
            });
        }
    });
});

// 文章列表
admin.get('/list', (req, res) => {
    post.findAll((err, rows) => {
        if (err) {
            return res.send('数据库错误');
        }
        // 成功
        res.render('admin/list', { posts: rows });
    });
})

// 退出登录
admin.get('./logout',(req,res)=>{
    // 清空用户信息
    req.session.loginfo = null;
    res.redirect('/login');
})
// 添加博客
admin.post('/add',(req,res)=>{
    // 获得表单提交的博客内容 当前登录用户就是坐着 通过session读取到作者的ID 然后ID记录在博客文章中
    req.body.uid = req.session.loginfo.id;
    post.insert(req.body,(err)=>{
        if(!err){
            res.json({
                code:10000,
                msg: '添加成功'
            });
        }
    })
})
// 删除博客

admin.post('/delete',(req,res)=>{
    // 根据ID删除
    post.delete(req.quer.id,(err)=>{
        if(!err){
            res.json({
                code:10000,
                msg: '删除成功'
            });
        }
    });
});

// 更新个人资料
admin.post('./update', (req, res) => {
    let uid = req.session.loginfo.id;
    user.update(uid, req.body, (err) => {
        if (!err) {
            res.json({
                code: 10000,
                msg: '更新成功'
            });
        }
    });
})


admin.post('/modify', (req, res) => {
    // console.log(req.body);

    let id = req.body.id;

    delete req.body.id;

    post.modify(id, req.body, (err) => {
        if (!err) {
            res.json({
                code: 10000,
                msg: '修改成功'
            })
        }
    });
});

// 头像上传
// 使用中间件 upload.sigle 实现文件上传
admin.post('/upfile',upload.single('avatar'),(req,res)=>{
    res.json({
        code:10000,
        msg:'上传成功',

        path: req.file.path
    });
})

// 路由开放出来
module.exports = admin;