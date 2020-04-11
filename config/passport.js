const LocalStrategy = require("passport-local").Strategy;

const User = require("../models/user");

module.exports = function(passport) {
    passport.serializeUser(function(user, done){
        done(null, user.id);
    })
    //used to deserialize the user
    passport.deserializeUser(function(id, done){
        User.findById(id, function(err, user){
            done(err, user);
        });
    });

    passport.use(new LocalStrategy({usernameField: "email"},
        function(username, password, done) {
          User.findOne({ username: username }, function (err, user) {
            if (err) { return done(err); }
            if (!user) {
              return done(null, false, { message: 'Incorrect username.' });
            }
            if (!user.validPassword(password)) {
              return done(null, false, { message: 'Incorrect password.' });
            }
            return done(null, user);
          });
        }
    ));
}