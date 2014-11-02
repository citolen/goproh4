var GoPro = require('../lib/index.js');

var cam = new GoPro.Camera();

/*
**  Set camera mode
*/
cam.mode(GoPro.Settings.Modes.Photo, GoPro.Settings.Submodes.Photo.Single).then(function () {

    /*
    **  Set photo resolution
    */
    cam.set(GoPro.Settings.PHOTO_RESOLUTION, GoPro.Settings.PhotoResolution.R12MPWide).then(function () {

        /*
        **  Take a picture
        */
        cam.start().then(function () {
            console.log('[picture taken]');
        });
    });
});
