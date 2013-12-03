angular.module('stockMarketApp').controller('AppCtrl', ['AlertService', 'UserService', function(AlertService, UserService) {

  var self = this;
  self.alertService = AlertService;
  self.userService = UserService;

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
}]).controller('AuthCtrl', ['AlertService', 'UserService', '$location', function(AlertService, UserService, $location) {
  var self = this;

  self.login = function() {
    UserService.login(self.username, self.password).then(function(user) {
      $location.path('/mine');
    }, function(err) {
      AlertService.set(err.msg);
    });
  };
  self.register = function() {
    UserService.register(self.username, self.password).then(function(user) {
      $location.path('/mine');
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

    self.getChange = function(stock) {
      return Math.ceil(((stock.price - stock.previous) / stock.previous) * 100);
    };
    self.getChangeClass = function(stock) {
      return {
        positive: stock.price > stock.previous,
        negative: stock.price <= stock.previous
      }
    };
}]).controller('LogoutCtrl', ['UserService', '$location', function(UserService, $location) {
  var redirect = function() {
    $location.path('/');
  };
  UserService.logout().then(redirect, redirect);
}]);

