var GoPro = require('../lib/index.js');

var cam = new GoPro.Camera();


// Turn the camera off
cam.powerOff()

// Wait 8s
.delay(8000)

// Turn the camera on
.then(function () {
    return cam.powerOn()
});
