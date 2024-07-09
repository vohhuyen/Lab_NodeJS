var express = require('express');
var passport = require('passport');
var LocalStrategy = require('passport-local');
var crypto = require('crypto');
var { User } = require('../models');
var router = express.Router();

passport.use(new LocalStrategy(async function verify(username, password, cb) {
  try {
    const user = await User.findOne({ where: { username } });
    if (!user) {
      return cb(null, false, { message: 'Incorrect username or password.' });
    }
    crypto.pbkdf2(password, user.salt, 310000, 32, 'sha256', function(err, hashedPassword) {
      if (err) { return cb(err); }
      if (!crypto.timingSafeEqual(user.hashed_password, hashedPassword)) {
        return cb(null, false, { message: 'Incorrect username or password.' });
      }
      return cb(null, user);
    });
  } catch (err) {
    cb(err);
  }
}));

passport.serializeUser(function(user, cb) {
  process.nextTick(function() {
    cb(null, { id: user.id, username: user.username });
  });
});

passport.deserializeUser(async function(user, cb) {
  try {
    const deserializedUser = await User.findByPk(user.id);
    cb(null, deserializedUser);
  } catch (err) {
    cb(err);
  }
});

router.get('/login', function(req, res, next) {
  res.render('login');
});

router.post('/login/password', passport.authenticate('local', {
  successRedirect: '/',
  failureRedirect: '/login'
}));

router.post('/logout', function(req, res, next) {
  req.logout(function(err) {
    if (err) { return next(err); }
    res.redirect('/');
  });
});

router.get('/signup', function(req, res, next) {
  res.render('signup');
});

router.post('/signup', async function(req, res, next) {
  try {
    var salt = crypto.randomBytes(16);
    crypto.pbkdf2(req.body.password, salt, 310000, 32, 'sha256', async function(err, hashedPassword) {
      if (err) { return next(err); }
      const user = await User.create({
        username: req.body.username,
        hashed_password: hashedPassword,
        salt: salt
      });
      req.login(user, function(err) {
        if (err) { return next(err); }
        res.redirect('/');
      });
    });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
