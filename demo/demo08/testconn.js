var db = require('./connection');

var sql = "insert into t_user (id,name) values(?,?)";
var options = ['4','4'];

/*db.query(sql,options,function(e,r,f){
	console.log(r);
});*/

var sqlEntity = [];
var sqlParams = {sql:sql,options:options};
sqlEntity.push(sqlParams);

var sql1 = 'insert into t_user (id,name) values(?,?)';
var options1 = ['5','5'];
var sqlParams1 = {sql:sql1,options:options1};
sqlEntity.push(sqlParams1);

db.execTran(sqlEntity,function(e,r){
	console.log(r);
});