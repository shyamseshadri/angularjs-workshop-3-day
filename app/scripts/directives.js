angular.module('stockMarketApp').directive('stockWidget', ['StockService', 'UserService', '$interval',
  function(StockService, UserService, $interval) {
  return {
    restrict: 'A',
    templateUrl: 'views/stock-widget.html',
    scope: {
      stockData: '=',
      whenToggle: '&'
    },
    link: function($scope, $element, $attrs) {
      $scope.getChange = function() {
        return Math.ceil((($scope.stockData.price - $scope.stockData.previous) / $scope.stockData.previous) * 100);
      };
      $scope.getChangeClass = function() {
        return {
          positive: $scope.stockData.price > $scope.stockData.previous,
          negative: $scope.stockData.price <= $scope.stockData.previous
        }
      };
      $scope.toggleFavorite = function() {
        StockService.toggleFavorite($scope.stockData.ticker).then(function(stocks) {
          if ($scope.whenToggle) {
            $scope.whenToggle();
          }
        }, function(err) {});
      };
      $scope.shouldShowButtons = function() {
        return UserService.isLoggedIn();
      };

      var fetchStockDetail = function() {
        StockService.get($scope.stockData.ticker).success(function(stockData) {
          $scope.stockData.history = stockData.history;
          $scope.stockData.price = stockData.price;
          $scope.stockData.previous = stockData.previous;
        });
      };
      $interval(fetchStockDetail, 5000);
    }

  };
}]).directive('lineChart', ['$timeout', '$window', function($timeout, $window) {
  return {
    restrict: 'A',
    scope: {
      graphData: '='
    },
    link: function($scope, $element, $attrs) {
      var checkAndContinue = function() {
        if ($window.googleChartsLoaded) {
          drawChart();
        } else {
          $timeout(checkAndContinue, 500);
        }
      };

      var dataToArray = function(priceHistory) {
        var arr = [['Index', 'Price']];
        for (var i = 0; i < priceHistory.length; i++) {
          arr.push([i, priceHistory[i]]);
        }
        return arr;
      };

      var drawChart = function() {
        var chart = new google.visualization.LineChart($element[0]);
        $scope.$watch('graphData', function(newVal) {
          if (newVal) {
            chart.draw(google.visualization.arrayToDataTable(dataToArray(newVal)), {
              height: 70,
              legend: {position: 'none'}
            });
          }

        }, true);
      };
      checkAndContinue();

    }
  };
}]).directive('datepicker', [function() {
    return {
      restrict: 'A',
      require: 'ngModel',
      scope: {
        whenSelect: '&'
      },
      link: function($scope, $element, $attrs, ngModelCtrl) {

        var configObj = {
          onSelect: function(dateTxt) {
            ngModelCtrl.$setViewValue(dateTxt);
            if ($scope.whenSelect) {
              $scope.whenSelect({date: dateTxt});
            }

            $scope.$apply();
          }
        };

        ngModelCtrl.$render = function() {
          $element.datepicker('setDate', ngModelCtrl.$viewValue);
        };

        $element.datepicker(configObj);
      }
    };
  }]);
