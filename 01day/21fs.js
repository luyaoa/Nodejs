// 通过系统模块 fs 可以实现目录以及文件的操作（增删改查）

let fs = require('fs');
//必须传参  传参之后 没有反应就是成功了 有错误才会提出
// mkdir 可以支持两个参数  第一个是文件名称  第二个是回调函数

fs.mkdir('text',function(){
    console.log(1)
});

// 匿名函数
fs.mkdir('test',(er) => {
    // 传一个形参
    // 如果有错误 er形参是一个对象里面写了详细信息
    // 没有错误 形参为null
    // 第一个参数一般是错误信息
    console.log(er);
});

// 创建文件aa.html
//第一个参数路径 第二个参数可以写入内容 第三个参数回调函数
fs.writeFile('./text/aa.html','<h1>你好张洢豪</h1>',(er)=>{
  if(!er){
      console.log('文件创建成功');
  }
});







 