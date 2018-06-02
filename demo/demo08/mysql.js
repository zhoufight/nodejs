var mysql = require('mysql');

var conn = mysql.createConnection({
	host:'localhost',
	port:'3306',
	user:'nodejs',
	password:'nodejs',
	database:'nodejs'
});

conn.connect();

conn.query('select * from t_user',function(err,result,feild){
	if (err) throw err;
	console.log(result[0]);
});


