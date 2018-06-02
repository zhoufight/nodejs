var pool = require('./conn');

pool.query('select * from t_user where id = ?',['1'],function(err,res,feild){
	if(err) throw err;
	console.log(res[0]);
	console.log(JSON.stringify(res[0]));
});


