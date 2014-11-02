var GoPro = require('../lib/index.js');

var cam = new GoPro.Camera();


/*
**  Get a setting value
*/

cam.set(GoPro.Settings.PHOTO_CURRENT_MODE).then(function (val) {
    console.log('[photo current mode] = ', val);
});

/*
**  Set a setting
*/

cam.set(GoPro.Settings.SETUP_DEFAULT_APP_MODE, GoPro.Settings.SetupDefaultAppMode.Photo).then(function () {
    console.log('[default app mode changed]');
});
