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
