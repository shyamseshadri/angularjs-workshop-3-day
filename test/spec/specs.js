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
