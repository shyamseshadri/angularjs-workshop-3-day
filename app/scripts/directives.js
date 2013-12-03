angular.module('stockMarketApp').directive('stockWidget', [function() {
  return {
    restrict: 'A',
    templateUrl: 'views/stock-widget.html'
  };
}]);
