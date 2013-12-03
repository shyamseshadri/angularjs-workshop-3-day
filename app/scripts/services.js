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
      }
    };
  }]).factory('UserService', ['$http', function($http) {
    return  {
      register: function(username, pwd) {
        return $http.post('/api/register', {username: username, password: pwd});
      }
    };
  }]);
