var users = require('../controllers/users');
var videos = require('../controllers/videos');
var helpers = require('../helpers/helperFunctions');

var routesAPI = function(app){
	//user routes
	app.post('/user/auth', users.auth);
	app.get('/user/logout', helpers.isAuthenticated, users.logout);

	//video routes
	app.get('/videos',  videos.get);//helpers.isAuthenticated,
	app.get('/video', helpers.isAuthenticated, videos.getOne);
	app.post('/video/ratings',  videos.rate); //helpers.isAuthenticated,
}


module.exports = routesAPI;