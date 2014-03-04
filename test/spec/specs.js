'use strict';

describe('Service: AlertService', function () {

  // load the controller's module
  beforeEach(module('stockMarketApp'));

  var alertService;
  beforeEach(inject(function (AlertService) {
    alertService = AlertService;
  }));

  it('should display error messages', function () {
    expect(alertService.get()).toBeUndefined();
    alertService.set('This is a test');
    expect(alertService.get()).toEqual('This is a test');
    alertService.clear();
    expect(alertService.get()).toBeNull();
  });

});

describe('Controller: LandingCtrl', function () {

  // load the controller's module
  beforeEach(module('stockMarketApp'));

  var ctrl, mockBackend;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $httpBackend) {
    mockBackend = $httpBackend;
    mockBackend.expectGET('/api/stocks').respond([{ticker: 'GOOG'}, {ticker: 'AMZN'}]);
    ctrl = $controller('LandingCtrl');
  }));

  it('should fetch all stocks on load', function () {
    expect(ctrl.stocks).toEqual([]);

    mockBackend.flush();

    expect(ctrl.stocks).toEqual([{ticker: 'GOOG'}, {ticker: 'AMZN'}]);
  });
});

describe('Controller: AuthCtrl', function () {

  // load the controller's module
  beforeEach(module('stockMarketApp'));

  var ctrl, mockBackend, $loc, userService;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $httpBackend, $location, UserService) {
    mockBackend = $httpBackend;
    userService = UserService;
    $loc = $location;

    ctrl = $controller('AuthCtrl');
  }));

  it('should register the user', function () {
    ctrl.username = 'shyam';
    ctrl.password = 'test';

    mockBackend.expectPOST('/api/register', {username: 'shyam', password: 'test'}).respond({user: {name: 'shyam'}});

    expect(userService.isLoggedIn()).toBeFalsy();
    ctrl.register();

    mockBackend.flush();
    expect($loc.path()).toEqual('/mine');
    expect(userService.isLoggedIn()).toBeTruthy();
  });
});

describe('Directive: Stock Widget', function() {

  // load the controller's module
  beforeEach(module('stockMarketApp'));

  var compile, rs, mockBackend, interval;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($compile, $rootScope, $httpBackend, $interval) {
    rs = $rootScope;
    compile = $compile;
    mockBackend = $httpBackend;
    interval = $interval;
  }));

  it('should create a stock widget', function() {
    var scope = rs.$new();


    mockBackend.expectGET('views/stock-widget.html').respond('<div>{{stockData.ticker}}</div>');

    scope.myStock = {
      price: 100,
      previous: 200,
      history: [10, 20],
      ticker: 'TWTR'
    };
    var elem = compile('<div stock-widget stock-data="myStock"></div>')(scope);

    scope.$digest();
    mockBackend.flush();

    expect(elem.html()).toEqual('<div class="ng-binding">TWTR</div>');
    expect(elem.scope().getChangeClass()).toEqual({positive: false, negative: true});

    mockBackend.expectGET('/api/stocks/TWTR').respond({price: 150, previous: 100, history: [1, 3, 2]});

    interval.flush(5100);
    mockBackend.flush();

    expect(elem.scope().stockData.price).toEqual(150);
    expect(elem.scope().stockData.previous).toEqual(100);
    expect(elem.scope().stockData.history).toEqual([1, 3, 2]);
  });
});
