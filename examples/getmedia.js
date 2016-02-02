var GoPro = require('../lib/index.js');

var cam = new GoPro.Camera();

// list media
cam.listMedia().then(function (result) {

    var lastDirectory = result.media[result.media.length - 1];
    var lastFile = lastDirectory.fs[lastDirectory.fs.length - 1];

    // get last media
    cam.getMedia(lastDirectory.d, lastFile.n, lastFile.n).then(function (filename) {
        console.log(filename, '[saved]');
    });
});
