
describe('Stock home page', function() {

  it('should display a list of stocks on the main page', function() {
    browser.get('/');
    var all =
      browser.findElements(by.repeater('stock in landingCtrl.stocks'));
    all.then(function(arr) {
      expect(arr.length).toEqual(11);
    });
  });

});


