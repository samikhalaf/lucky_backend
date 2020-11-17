const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');

const User = require('../models/User');

passport.use(
  'register',
  new LocalStrategy(
    {
      usernameField: 'email',
      passwordField: 'password',
      passReqToCallback: true, // Receive req in case more fields are needed when registering user
    },
    (req, email, password, done) => {
      User.findOne({ email })
        .then((user) => {
          // If there is no user in DB, register it
          if (!user) {
            const salt = bcrypt.genSaltSync(12);
            const hash = bcrypt.hashSync(password, salt);

            const newUser = new User({
              email,
              password: hash,
              // Add all other fields from here on using the req object...
            });

            newUser
              .save()
              .then(() => done(null, newUser))
              .catch((err) => done(err, null));
          } else {
            throw new Error('User already exists');
          }
        })
        .catch((err) => done(err, null));
    },
  ),
);

passport.use(
  'login',
  new LocalStrategy(
    {
      usernameField: 'email',
      passwordField: 'password',
      passReqToCallback: true, // Receive req in case more fields are needed when registering user
    },
    (req, email, password, done) => {
      User.findOne({ email })
        .then((user) => {
          // If there is no user in DB, register it
          if (!user) {
            throw new Error('User does not exist');
          }

          const userPassword = user.get('password');
          const isValidPassword = bcrypt.compareSync(password, userPassword);

          if (!isValidPassword) {
            throw new Error('Incorrect email and password');
          }

          done(null, user);
        })
        .catch((err) => done(err, null));
    },
  ),
);

// Create a cookie containing the user id
passport.serializeUser((user, done) => {
  done(null, user.id);
});

// Get the cookie from the request and convert it into the user
passport.deserializeUser((id, done) => {
  User.findById(id).then((user) => done(null, user));
});
