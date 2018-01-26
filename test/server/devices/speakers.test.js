describe("speakers", function() {
  var speakers = require('../../../src/server/devices/speakers');

  beforeEach(function() {
  });

  it("get master volume", function(done) {
    speakers.getVolume().then(function(vol) {
     
    expect(vol >= 0 && vol <= 100).toBe(true);
    done();

  }).catch(function(err) {
     fail(err);
  });
  });
  it("set master volume and check value", function(done) {
    var vol=35;
    speakers.setVolume(vol).then(function() {
      speakers.getVolume().then(function(newVol) { 
     
    expect(newVol).toBeCloseTo(vol);
    done();
    });
  }).catch(function(err) {
     fail(err);
  });
  })
  it("mute and check value", function(done) {
    var mute=true;
    speakers.setMuted(mute).then(function() {
      speakers.getMuted().then(function(newMuteValue) { 
     
    expect(newMuteValue).toBe(mute);
    done();
    });
  }).catch(function(err) {
     fail(err);
  });
  })
  it("unmute and check value", function(done) {
    var mute=false;
    speakers.setMuted(mute).then(function() {
      speakers.getMuted().then(function(newMuteValue) { 
     
    expect(newMuteValue).toBe(false);
    done();
    });
  }).catch(function(err) {
     fail(err);
  });
  })
});
