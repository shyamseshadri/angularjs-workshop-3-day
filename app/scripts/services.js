angular.module('stockMarketApp')
  .factory('AlertService', function() {
    var message;
    return {
      set: function(msg) {
        message = msg;
      },
      clear: function() {
        message = null;
      },
      get: function() {
        return message;
      }
    };
  }).factory('StockService', ['$http', function($http) {
    return {
      query: function() {
        return $http.get('/api/stocks');
      },
      get: function(code) {
        return $http.get('/api/stocks/' + code);
      }
    };
  }]).factory('UserService', ['$http', '$q', function($http, $q) {
    var user = {};
    var loggedIn = false;
    var loginSuccess = function(resp) {
      user = resp.data.user;
      loggedIn = true;
      return user;
    };
    var loginFailure = function(err) {
      loggedIn = false;
      return $q.reject(err.data);
    };

    return  {
      isLoggedIn: function() {
        return loggedIn;
      },
      login: function(username, pwd) {
        return $http.post('/api/login', {username: username, password: pwd}).then(loginSuccess, loginFailure);
      },
      logout: function() {
        return $http.post('/api/logout', {}).then(function() {loggedIn = false;}, function() {loggedIn = false});
      },
      register: function(username, pwd) {
        return $http.post('/api/register', {username: username, password: pwd}).then(loginSuccess, loginFailure);
      }
    };
  }]);
