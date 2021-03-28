var express = require('express');
var router = express.Router();

const md5 = require("md5");
const db = require("../database");

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Log In'});
});

router.post('/login', function(req, res, next) {
  let loginError = "";

  if(!req.body) {
    loginError = "Invalid login payload";
    req.flash("error", loginError);
    res.redirect('/');
  } else {
    const {email, password} = req.body;
  
    if (email && password) {
      const sql = "SELECT * FROM users WHERE email = ? AND password = ?";
      db.query(sql, [email, md5(password)], function (err, result) {
          if (err) throw err;
          if (result.length > 0) {
            res.redirect('/account');
          } else {
            loginError = "Login failed";
            req.flash("error", loginError);
            res.redirect('/');
          }
      });
    }
  }
});

router.get('/register', function(req, res, next) {
  res.render('register', { title: 'Registration'});
});

router.post('/register', function(req, res, next) {
  let signupError = "";

  if(!req.body) {
    loginError = "Invalid signup payload";
    req.flash("error", signupError);
    res.redirect('/');
  } else {
    const {username, email, password} = req.body;

    if (username && email && password) {
        const sql = "INSERT INTO users (name, email, password) VALUES (?, ?, ?)";
        db.query(sql, [username, email, md5(password)], function (err, result) {
            if (err) {
              signupError = "Signup failed";
              req.flash("error", signupError);
              res.redirect('/');
            } else {
              res.redirect('/account');
            }
        });
    }
  }
});

router.get('/account', function(req, res, next) {
  const sql = "SELECT * FROM movies";
  db.query(sql, function (err, result) {
      if (err) throw err;

      res.render('account', { title: 'Your movies', movies: result});
  });  
});

router.get('/movies/:id', function(req, res, next) {
  const movieId = req.params.id;

  const sql = "SELECT * FROM movies WHERE id = ?";
  db.query(sql, [movieId], function (err, result) {
      if (err) throw err;

      res.render('movie', {movie: result[0]});
  });  
});


module.exports = router;
