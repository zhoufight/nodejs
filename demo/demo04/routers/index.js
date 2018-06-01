var home = require('./home.js');
function router(app){
	app.use('/',home);
}

module.exports = router;