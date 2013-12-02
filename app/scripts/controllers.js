angular.module('stockMarketApp').controller('AppCtrl', [function() {
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
}]).controller('RegisterCtrl', ['$window', function($window) {
  var self = this;

  self.register = function() {
    self.message = 'Trying to register with ' + self.username + ' & ' + self.password;
    $window.alert(self.message);
  };
}]);

