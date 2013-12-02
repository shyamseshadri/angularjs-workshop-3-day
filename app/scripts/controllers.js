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
}]);
