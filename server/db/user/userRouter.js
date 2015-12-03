var User = require('./userModel');
var UserController = require('./userController');
var jwt = require('jwt-simple');

/**
 * Routes for User Models on the DB
 * Handles all routes: '/api/users'
 * 
 * All Passport Strategies are in server/config/passport.js
 */
module.exports = function(app, passport) {

  app.route('/')
    .post(UserController.getUserList)
    .put(UserController.updateUserList);

  app.route('/register')
    .post(UserController.register);

  app.route('/login')
    .post(UserController.login);

  // *
  //  * Initial Route for google Login
  //  * Will redirect users to a google Auth page asking for access to the things in the scope array
  //  * Saves new user to DB if successful
   

  app.route('/auth/google')
    .post( passport.authenticate('google', {scope: ['email', 'profile']}))
    .get( passport.authenticate('google', {scope: ['email', 'profile']}));


  /**
   * Not implemented
   */

  app.get('/auth/google/callback', 
    passport.authenticate('google', { failureRedirect: '/login' }),
    function(req, res) {
      // Successful authentication, redirect home.
      res.redirect('/');
    });

   app.route('/auth/google/callback')
     .post(UserController.googleCallback);
};
