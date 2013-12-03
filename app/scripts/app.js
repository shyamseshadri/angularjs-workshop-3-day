angular.module('stockMarketApp', ['ngRoute'])
  .config(function ($routeProvider) {

    $routeProvider
      .when('/', {
        templateUrl: 'views/list.html'
      })
      .when('/login', {
        templateUrl: 'views/login.html',
        controller: 'AuthCtrl',
        controllerAs: 'loginCtrl'
      })
      .when('/register', {
        templateUrl: 'views/signup.html',
        controller: 'AuthCtrl',
        controllerAs: 'signupCtrl'
      })
      .when('/mine', {
        templateUrl: 'views/mine.html',
        controller: 'MyStocksCtrl',
        controllerAs: 'myStocksCtrl',
        resolve: {
          auth: ['UserService', 'AlertService', '$q', '$location', function(UserService, AlertService, $q, $location) {
            return UserService.tokens().then(function(success) {}, function(err) {
              AlertService.set('Please login to access your information');
              $location.path('/login');
              return $q.reject(err);
            });
          }]
        }
      })
      .when('/logout', {
        template: ' ',
        controller: 'LogoutCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
