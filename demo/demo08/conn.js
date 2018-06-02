var mysql = require('mysql');
var pool = mysql.createPool({
	host:'localhost',
	port:'3306',
	user:'nodejs',
	password:'nodejs',
	database:'nodejs'
});

module.exports = pool;
