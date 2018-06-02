var db = {};
var mysql = require('mysql');
var async = require('async');

var pool = mysql.createPool({
	host:'localhost',
	port:'3306',
	user:'nodejs',
	password:'nodejs',
	database:'nodejs'
});

var query = function(sql,options,callback){
	pool.getConnection(function(err,conn){
		if(err) callback(err,null,null);

		conn.query(sql,options,function(e,r,f){
			conn.release();
			callback(e,r,f);
		});
	});
}

var execTran = function(sqlEntity,callback){
	pool.getConnection(function(err,conn){
		if (err) callback(err,null);

		conn.beginTransaction(function(err){
			if (err) callback(err,null);
			var func = [];

			sqlEntity.forEach(function(sqlParam){
				var fun = function(cb){
					var sql = sqlParam.sql;
					var options = sqlParam.options;
					conn.query(sql,options,function(e,r,f){
						if (e) {
							conn.rollback(function(){
								throw e;
							});
						}else{
							cb(null,'ok');
						}
					});
				};
				func.push(fun);
			});
			async.series(func,function(err,result){
				if(err){
					conn.release();
					callback(err,null);
				}else{
					conn.commit(function(err,info){
						if(err){
							conn.rollback(function(){
								conn.release();
								callback(err,null);
							});
						}else{
							conn.release();
							callback(null,info);
						}
					});
				}
			});
		});
	});

}

db.query = query;
db.execTran = execTran;
db.pool = pool;


module.exports = db;
