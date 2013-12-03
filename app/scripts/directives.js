angular.module('stockMarketApp').directive('stockWidget', [function() {
  return {
    restrict: 'A',
    templateUrl: 'views/stock-widget.html',
    scope: {
      stockData: '='
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
    }

  };
}]);
