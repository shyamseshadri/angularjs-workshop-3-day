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
