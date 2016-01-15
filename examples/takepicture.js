var GoPro = require('../lib/index.js');

var cam = new GoPro.Camera();

// Set camera mode
cam.mode(GoPro.Settings.Modes.Photo, GoPro.Settings.Submodes.Photo.Single)

// Set photo resolution
.then(function () {
    return cam.set(GoPro.Settings.PHOTO_RESOLUTION, GoPro.Settings.PhotoResolution.R7MPMedium);
})

// Take picture
.then(function () {
    return cam.start()
})

// Done
.then(function () {
    console.log('[picture taken]')
});
