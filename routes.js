var passport = require('passport'),
    _ = require('underscore'),
  LocalStrategy = require('passport-local').Strategy;

exports.routes = function(app, stocks_json) {

  var users = {};

  setInterval(function() {
    for (var key in stocks_json) {
      var stock = stocks_json[key];
      var currentPrice = stock.price;
      var change = Math.ceil(Math.random() * 10) * 0.01;
      var increment = Math.random() * 100 > 50;
      stock.previous = currentPrice;
      stock.price = increment ? currentPrice * (1 + change) : currentPrice * (1 - change);
      if (stock.price < 0) {
        stock.price = 1;
      }
      stock.history.push(currentPrice);
    }
  }, 5000);

  passport.use(new LocalStrategy(function(username, password, done) {
    /// find user
    // if exists
    if (users[username]) {
      if (password === users[username].password) {
        done(null, users[username]);
      } else {
        done(null, false, {msg: 'Incorrect password'});
      }
    } else {
      done(null, false, {msg: 'Could not find user with username ' + username});
    }
  }));

  var isLoggedIn = function(req, res, next) {
    if (req.isAuthenticated()) {
      next();
    } else {
      //req.session.error = 'Access Denied';
      res.send({
        msg: 'Please login to access this information'
      }, 400);
    }
  };
  var login = function(req, res, user) {
    req.logIn(user, function(err) {
      if (err) { return res.send({msg: 'Error logging in', err: err}, 500); }
      return res.send({loginStatus: true, user: user});
    });
  };
  var individualRoutes = {
    allStocks: function(req, res) {
      var allStocks = _(stocks_json).values();
      if (req.user) {
        for (var  i = 0; i < allStocks.length; i++) {
          allStocks[i].favorite = _(req.user.favorites).contains(allStocks[i].ticker);
        }
      } else {
        for (var  i = 0; i < allStocks.length; i++) {
          delete allStocks[i].favorite;
        }
      }
      res.send(allStocks);
    },
    stock: function(req, res) {
      res.send(stocks_json[req.params.stock]);
    },
    dashboardStocks: function(req, res) {
      var stocks = _(stocks_json).keys();
      var randomStocks = [];
      while (randomStocks.length < 3) {
        var randomIndex = Math.floor(Math.random() * 1000) % stocks.length;
        if (!(_(randomStocks).contains(stocks_json[stocks[randomIndex]]))) {
          delete stocks_json[stocks[randomIndex]].favorite;
          randomStocks.push(stocks_json[stocks[randomIndex]]);
        }
      }
      res.send(randomStocks);
    },
    toggleFavorite: function(req, res) {
      var stockCode = req.body.stockCode;
      if (stocks_json[stockCode]) {
        var user = req.user;

        if (_(user.favorites).contains(stockCode)) {
          user.favorites = _(user.favorites).without(stockCode);
        } else {
          user.favorites.push(stockCode);
        }
        users[user.username].favorites = user.favorites;
        res.send(user.favorites);
      } else {
        res.send({msg: 'Invalid stock code ' + stockCode}, 404);
      }
    },
    register: function(req, res) {
      var username = req.body.username;
      var password = req.body.password;

      if (users[username]) {
        res.send({msg: "User is already registered. Please log in."}, 400);
      } else {
        users[username] = {username: username, password: password, favorites: []};
        login(req, res, users[username]);
      }
    },
    login: function(req, res, next) {
      passport.authenticate('local', function(err, user) {
        if (err) {return next(err); }
        if (!user) { return res.send({loginStatus: false, msg: 'Unable to login'}, 400); }
        login(req, res, user);
      })(req, res, next);
    },
    logout: function(req, res) {
      req.logout();
      res.send({loginStatus: false, msg: "Successfully Logged out"});
    },
    token: function(req, res) {
      res.send({
        loginStatus: true,
        user: req.user
      });
    }
  };

  app.get('/api/stocks', individualRoutes.allStocks);
  app.get('/api/stocks/:stock', individualRoutes.stock);
  app.get('/api/dashboard', individualRoutes.dashboardStocks);

  app.post('/api/favorite', isLoggedIn, individualRoutes.toggleFavorite);
  app.post('/api/register', individualRoutes.register);
  app.post('/api/login', individualRoutes.login);
  app.post('/api/logout', isLoggedIn, individualRoutes.logout);
  app.post('/api/token', isLoggedIn, individualRoutes.token);
};
