// myConf.js
exports.config = {
  seleniumAddress: 'http://localhost:4444/wd/hub',
  specs: ['e2eSpec.js'],
  jasmineNodeOpts: {
    showColors: true
  },
  capabilities: {
    browserName: 'chrome'
  }
}
