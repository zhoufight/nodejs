var request = require('request');

var opts = {
	url:"http://localhost:3000/post",
	method:"POST",
	form:{
		name:"shotq",
		job:"javaer"
	},
	headers:{
		"Content-Type":"application/x-www-form-urlencoded"
	}
}

request(opts,function(err,res,body){
	console.log(res);
});

var params = {name:"shotq",job:"nodejs"};
var opts2 = {
	url:"http://localhost:3000/postjson",
	method:"POST",
	body:JSON.stringify(params),
	headers:{
		"Content-Type":"application/json"
	}	
}
request(opts2,function(err,res,body){
	console.log(res);
});

