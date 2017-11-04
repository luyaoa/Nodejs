let db = require('./db');
// 插入数据
exports.insert = function(data,cb){
    let query = 'insert into users set ?';

    // 密码加密处理
    data.pass = db.md5(data.pass);

    db.query(query,data,(err)=>{
        if(err){
            return cb(err); //处理错误
        }
        cb(null); //没有错误
    });
}
// 验证登录
exports.auth = function(email,password,cb){
    let query = 'select * from users where emsil = ?';

    db.query(query,email,(err,rows)=>{
        if(err){
            return cb(err);
        }
        // 判断密码是否与数据库中的相同 
        if(row[0].pass == db.md5(password)){
            return cb(null,rows[0]);
        }
        cb({msg: '用户或密码错误'});
    })
}
// 查询个人资料
exports.find = (id,cb)=>{
    let query = 'select * from users where id = ?';

    db.query(query,id,(err,rows)=>{
        if(err){
            return cb(err);
        }
        cb(null,rows);
    })
}

exports.update = function(id,data,cb){
    let query = 'update users set ? where id = ?';

    db.query(query,[data,id],(err)=>{
        if(err){
            return cb(err);
        }
        cb(null);
    })
}