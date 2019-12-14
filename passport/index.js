const User = require("../models/participant");

var passport = require("passport"),
  LocalStrategy = require("passport-local").Strategy;

passport.use(
  new LocalStrategy(function(username, password, done) {
    console.log("using local strategy");
    User.findOne({ email: username }, function(err, user) {
      console.log("user looked up");
      if (err) {
        console.log(err);
        return done(err);
      }
      if (!user) {
        console.log("no user found");
        return done(null, false, { message: "Incorrect username." });
      }
      if (!user.validPassword(password)) {
        console.log("incorrect pw");
        return done(null, false, { message: "Incorrect password." });
      }
      console.log("user found pw correct");
      return done(null, user);
    });
  })
);

passport.serializeUser(function(user, done) {
  done(null, user._id);
  console.log("user in serializeuser", user);
});

// Deserializing is what populates the `user` property on the request object.

passport.deserializeUser(function(id, done) {
  console.log("deserialize id", id);
  User.findOne({ _id: id }, function(err, user) {
    done(err, user);
  });
});

module.exports = passport;
