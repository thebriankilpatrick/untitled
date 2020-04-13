const LocalStrategy = require("passport-local").Strategy;

const User = require("../models/user");

module.exports = function(passport) {
  console.log("PASSPORT CONFIIIIIGGGGGGGG");

  passport.serializeUser(function(user, done){
    console.log("SERIALIZER", user);
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
        console.log(`USING THE LOCAL STRADEGYYYYYYY  username: ${username}  password: ${password}`);
        User.findOne({ email: username }, function (err, user) {
          if (err) { return done(err); }
          console.log("config/passport.js------------", user);
          if (!user) {
            return done(null, false, { message: 'Incorrect username.' });
          }
          if (!user.checkPassword(password)) {
            return done(null, false, { message: 'Incorrect password.' });
          }
          return done(null, user);
        });
      }
  ));
}