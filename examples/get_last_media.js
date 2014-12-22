var GoPro = require('../lib/index.js');

var cam = new GoPro.Camera();

/*
**  List all the media
*/
cam.listMedia().then(function (result) {

    var lastDir = result.media[result.media.length-1];
    console.log("[last dir] = ", lastDir.d);
    var lastMedia = lastDir.fs[lastDir.fs.length-1];
    console.log("[last media] = ", lastMedia);
    // var dateTaken = new Date(lastMedia.mod * 1000); /* x1000 timestamp unix > timestamp ms */
    // var size = lastMedia.s / 1000000; /* octet to mo */
    var name = lastMedia.n; /* filename */
    var url = 'http://' + cam._ip + '/videos/DCIM/' + lastDir.d + '/' + name;
    console.log('[url] = ', url);
    cam.getMedia(url, __dirname)
        .then(function (file) {console.log('[media downloaded]', file);})
        .catch(function (err) {console.log('[media download error]', err); });

});
