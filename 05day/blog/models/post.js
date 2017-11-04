let db = require('./db');

// 插入数据
exports.insert = (data,cb)=>{
	let query = 'insert into posts set ?';
	db.query(query,data,(err)=>{
		if(err){
			return cb(err);

		}
		cb(null);
	})
}
// 查询所有
//  由于调用的时候参数的个数不能确定 所以用...语法来接收 （接收到的一个数组里）
exports.findAll = (...args)=>{

	let query,offser,pageSize,cb;

	// 当只传一个参数并且作为回调函数的时候
	if(args.length == 1 && typeof args[0] == "function"){

		// 查询所有数据不做分页
		query = 'select * from posts left join users on posts.uid = users.id';
		// 第一个参数就是回调函数 
		cb = args[0];
	}else{
		// 当传递三个参数时 就会根据参数位置获取相对应的参数 
		// 每页的数据的条数
		pageSize = args[0];
		// 当前页数
		page = args[1];
		// 第三个参数是回调函数
		cb = args[2];

		offset = (page - 1) * pageSize;

		query = 'select * from posts left join users on posts.uid = users.id limit ? , ?';
	}
	// 执行sql语句
	db.query(query,[offset,pageSize],(err,rows)=>{
		if(err){
			return cb(err);

		}
		cb(null,rows);
	});

}

// 删除
exports.delete = (id,cb)=>{
	let query ='delete from posts where id = ?';

	db.query(query,id,(err)=>{
		if(err){
			return cb(err);

		}
		cb(null);
	})	
}

// 查找单条博客
module.exports.find = (id, cb)=>{
    let query = 'select * from posts left join users on posts.uid = users.id where posts.id = ? ';
    db.query(query,(err,rows)=>{
        if(err){
            return cb(err);
        
        }
        cd(null,rows);
    })
    
}   

// 修改博客内容
exports.modify = (id,data,cb)=>{
	let query = 'update posts set ? where id = ?';
// 	db.query(query,[data,id],(err)=>{
// 		if(err){
// 			return cb(err);
// 		}
// 		cb(null);
// 	})
	 db.query(query,[data,id],cb)
}

// 博客总条数
exports.count = function(cb){
	let query = 'select count(*) as total from posts';
	db.query(query,(err,rows)=>{
		if(err){
			return cb(err);

		}
		cb(null,rows[0]);
	})
}
