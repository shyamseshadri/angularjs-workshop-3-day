angular.module('stockMarketApp').controller('AppCtrl', ['$scope', function($scope) {
  var self = this;

  self.stocks = [{
    "ticker": "TWTR",
    "name": "Twitter Inc",
    "price": 23,
    "previous": 21,
    "size": "Medium"
  }, {
    "ticker": "GOOG",
    "name": "Google Inc",
    "price": 884,
    "previous": 899,
    "size": "Large"
  }];

  self.getChange = function(stock) {
    return Math.ceil(((stock.price - stock.previous) / stock.previous) * 100);
  };
  self.getChangeClass = function(stock) {
    return {
      positive: stock.price > stock.previous,
      negative: stock.price <= stock.previous
    }
  };

    $scope.$on('registerClicked', function(event, message) {
      self.message = message;
    });
}]).controller('RegisterCtrl', ['$rootScope', function($rootScope) {
  var self = this;

  self.register = function() {
    $rootScope.$broadcast('registerClicked', 'Trying to register with ' + self.username + ' & ' + self.password);
  };
}]);

