var GoPro = require('../lib/index.js');

var cam = new GoPro.Camera();

/*
**  delete all
*/
cam.deleteLast().then(function () {
    console.log('[last media deleted]');
});
