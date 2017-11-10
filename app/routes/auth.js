var passport = require('passport');
var isAuthenticated = function (req, res, next) {
	// if user is authenticated in the session, call the next() to call the next request handler
	// Passport adds this method to request object. A middleware is allowed to add properties to
	// request and response objects
	if (req.isAuthenticated())
		return next();
	// if the user is not authenticated then redirect him to the login page
	res.redirect('/auth');
}


module.exports = function(app){

	/* GET index page */
	app.get('/', function(req, res) {
	    res.render('search', { title: 'Home', user: req.user });
	});


	/* GET login page. */
	app.get('/auth', function(req, res) {
    	// Display the Login page with any flash message, if any
			res.render('login', { title: 'Auth' });
	});


	/* GET User Page */
	app.get('/user', isAuthenticated, function(req, res){
		res.render('user', { title: 'Home', user: req.user });
	});

	/* Handle Logout */
	app.get('/logout', function(req, res) {
		req.logout();
		res.redirect('/auth');
	});

	// route for facebook authentication and login
	app.get('/auth/facebook',
		passport.authenticate('facebook', { scope : ['email'] }
	));

	// handle the callback after facebook has authenticated the user
	app.get('/auth/facebook/callback',
		passport.authenticate('facebook', {
			scope : ['email'],
			successRedirect : '/user',
			failureRedirect : '/auth'
		})
	);

  // route for google authentication and login
  app.get('/auth/google',
	  passport.authenticate('google', {scope: [
        'https://www.googleapis.com/auth/userinfo.profile',
        'https://www.googleapis.com/auth/userinfo.email'
    ]}),
		function(req, res){
	    // The request will be redirected to Google for authentication, so
	    // this function will not be called.
	  });

  // handle the callback after google has authenticated the user
  app.get('/auth/google/callback',
	  passport.authenticate('google', { failureRedirect: '/auth' }),
	  function(req, res) {
	    // Successful authentication, redirect home.
	    res.redirect('/user');
	  });
}
