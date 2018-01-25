describe("speakers", function() {
  var audio = require('../../../src/server/modules/audio');

  beforeEach(function() {
  });

  it("play btn_click sound", function() {
    audio.btn_click().then(function(value) {
       expect(value).toBeTruthy();
    }).catch(function(err) {
       fail(err);
    });
  });

});
