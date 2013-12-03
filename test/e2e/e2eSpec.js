
describe('Stock home page', function() {

  it('should display a list of stocks on the main page', function() {
    browser.get('/');
    var all =
      browser.findElements(by.repeater('stock in landingCtrl.stocks'));
    all.then(function(arr) {
      expect(arr.length).toEqual(11);
    });
  });

  it('should allow registering and clicking on all', function() {
    browser.get('/');

    element(by.css('.register-link')).click();

    var rand = Math.ceil(Math.random() * 10000);
    element(by.model('signupCtrl.username')).sendKeys('shyam' + rand);
    element(by.model('signupCtrl.password')).sendKeys('test');

    element(by.css('.btn-success')).click();

    browser.debugger();
    element(by.css('.btn-success.all')).click();

    var all =
      browser.findElements(by.repeater('stock in myStocksCtrl.stocks'));
    all.then(function(arr) {
      expect(arr.length).toEqual(11);
    });
  }, 20000);
});


