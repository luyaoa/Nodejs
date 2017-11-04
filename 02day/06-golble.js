setTimeout(function(){

	console.log('我是setTimeout执行的程序');
},2000);

var i=0;
setInterval(function(){
   console.log(++i);
},1000);
