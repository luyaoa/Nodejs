// 通过系统模块 path 用来获取路径的相关信息
// 比如 文件名 目录名 文件后缀等

let path = require('path');

let img = "./image/2345/logo.png";

// console.log(path.parse(img));

// 获取文件名

// 1.通过path模块的parse方法 可以解析出文件目录等相关信息
// let dir = path.parse(img).dir;
//     // 简写形式
// let {dir,name,ext} = path.parse(img);

// console.log(dir,name,ext);



// 2.通过path模块的dirname 方法 可以获取目录名称

dir = path.dirname(img);
// console.log(dir);


// 3.通过path模块的extname方法获取文件后缀

ext = path.dirname(img);
// console.log(ext);


// 4.通过path模块的join方法 处理路径
path.join("./a",'./b','./c');  // a/b/c   三个路径
console.log(path.join('./a','../b','c'));  // b


// Linux 使用 /
// window 使用/ \