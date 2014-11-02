var GoPro = require('../lib/index.js');

var cam = new GoPro.Camera();

cam.mode(GoPro.Settings.Modes.Photo, GoPro.Settings.Submodes.Photo.Single).then(function () {
    cam.set(GoPro.Settings.PHOTO_RESOLUTION, GoPro.Settings.PhotoResolution.R12MPWide).then(function () {
        cam.start().then(function () {
            console.log('picture taken');
        });
    });
});
