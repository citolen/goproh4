var GoPro = require('../lib/index.js');

var cam = new GoPro.Camera({
//    mac: 'xx:xx:xx:xx:xx:xx'
});

cam.ready()
.then(function () {
    // Turn the camera off
    return cam.powerOff();
})
// Wait 8s
.delay(8000)
.then(function () {
    // Turn the camera on
    cam.powerOn();
});