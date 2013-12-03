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
  }])
