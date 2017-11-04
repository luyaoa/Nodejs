// let mysql = require('mysql');
// // 密码加密
// let md5 = require('md5');

// // 链接数据库 
// let db = mysql.createConnection({
//     host:'localhost',
//     user:'root',
//     password:'123456',
//     database:'blog'
// });
// db.md5 = md5;
// module.exports = db;

let mysql = require('mysql');

let md5 = require('md5');

let db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '123456',
    database: 'blog'
});

db.md5 = md5;

module.exports = db;