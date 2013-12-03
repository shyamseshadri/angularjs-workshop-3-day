angular.module('stockMarketApp').controller('AppCtrl', ['AlertService', function(AlertService) {

  var self = this;
  self.alertService = AlertService;

}]).controller('LandingCtrl', ['StockService', function(StockService) {
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
}]).controller('AuthCtrl', ['AlertService', 'UserService', function(AlertService, UserService) {
  var self = this;

  self.login = function() {
    AlertService.set('Login Clicked');
  };
  self.register = function() {
    UserService.register(self.username, self.password).then(function(user) {
      AlertService.set('Successfully registered ' + self.username);
    }, function(err) {
      AlertService.set(err.data.msg);
    });
  };
}]).controller('MyStocksCtrl', ['StockService', function(StockService) {
  var self = this;
    self.stocks = [];
    StockService.query().success(function(stocks) {
      self.stocks = stocks;
    });
    self.filters = {
      favorite: true
    };

    self.toggleFilter = function() {
      if (self.filters.favorite) {
        delete self.filters.favorite;
      } else {
        self.filters.favorite = true;
      }
    };
}]);

