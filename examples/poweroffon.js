var GoPro = require('../lib/index.js');

var cam = new GoPro.Camera();


/*
**  Turn the camera off
*/

cam.powerOff().then(function () {

    /*
    **  Turn it back on after 8s
    */

    setTimeout(function () {
        cam.powerOn();
    }, 8000);
});
