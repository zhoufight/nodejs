var home = require('./home');
var api = require('./api');
module.exports = function(app){
	app.use('/',home);
	app.use('/api',api);
}
