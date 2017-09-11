var passport = require('passport');
var isAuthenticated = require('../modules/checkAuth');


module.exports = function(app) {

    /* GET index page */
    app.get('/', function(req, res) {
        res.json({ message: 'This is the index page - Landing Page' });
    });


    /* GET login page. */
    app.get('/auth', function(req, res) {
        // Display the Login page with any flash message, if any
        res.json({ "page": "login" });
    });


    /* GET User Page */
    app.get('/user', isAuthenticated, function(req, res) {
        res.render({ "page": "user" });
    });

    /* Handle Logout */
    app.get('/logout', function(req, res) {
        req.logout();
        res.redirect('/auth');
    });

    // route for facebook authentication and login
    app.get('/auth/facebook',
        passport.authenticate('facebook', { scope: ['email'] }));

    // handle the callback after facebook has authenticated the user
    app.get('/auth/facebook/callback',
        passport.authenticate('facebook', {
            scope: ['email'],
            successRedirect: '/user',
            failureRedirect: '/auth'
        })
    );

    // route for google authentication and login
    app.get('/auth/google',
        passport.authenticate('google', {
            scope: [
                'https://www.googleapis.com/auth/userinfo.profile',
                'https://www.googleapis.com/auth/userinfo.email'
            ]
        }),
        function(req, res) {
            // The request will be redirected to Google for authentication, so
            // this function will not be called.
            // this is the callback function for the google auth, which is EXPLICITLY written just below this
        });

    // handle the callback after google has authenticated the user
    app.get('/auth/google/callback',
        passport.authenticate('google', { failureRedirect: '/auth' }),
        function(req, res) {
            // Successful authentication, redirect home.
            res.redirect('/user');
        });
}