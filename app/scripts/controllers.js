angular.module('stockMarketApp').controller('AppCtrl', ['AlertService', 'StockService', function(AlertService, StockService) {
  var self = this;

    self.stocks = [];
    StockService.query().success(function(stocks) {
      self.stocks = stocks;
    });

  self.getChange = function(stock) {
    return Math.ceil(((stock.price - stock.previous) / stock.previous) * 100);
  };
  self.getChangeClass = function(stock) {
    return {
      positive: stock.price > stock.previous,
      negative: stock.price <= stock.previous
    }
  };

    self.alertService = AlertService;
}]).controller('RegisterCtrl', ['AlertService', function(AlertService) {
  var self = this;

  self.register = function() {
    AlertService.set('Trying to register with ' + self.username + ' & ' + self.password);
  };
}]);

