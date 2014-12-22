var GoPro = require('../lib/index.js');

var cam = new GoPro.Camera();

/*
**  delete all
*/
cam.deleteAll().then(function () {
    console.log('[storage cleared]');
});
