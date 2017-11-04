

exports.unlencoded = function(){

    // 解析处理post数据
    let text='';
    return function(req,res){
        req.on('data',(chunk)=>{});
            text+=chunk;
    }
    req.on('end',()=>{
        console.log(text);
        console.log(queryString.parser(text));
        next();
    })
}