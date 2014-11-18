var GoPro = require('../lib/index.js');

var cam = new GoPro.Camera();

/*
**  List all the media
*/
cam.listMedia().then(function (result) {

    /*
    **  For each directory the camera has
    **  I haven't seen more than one
    */
    result.media.forEach(function (directory) {

        console.log('[directory] =', directory.d);

        /*
        **  For each file in this directory
        */
        directory.fs.forEach(function (file) {

            var dateTaken = new Date(file.mod * 1000); /* x1000 timestamp unix > timestamp ms */
            var size = file.s / 1000000; /* octet to mo */
            var name = file.n; /* filename */

            if (file.g !== undefined) { // burst
                var burstId = file.g;
                var startingId = file.b;
                var endId = file.l;

                //  Format = G + burstId(3 digits) + pictureId (4 digits)
                //  pictureId = range between startingId and endId
                //
                //  Example: for [burstId = 5] [startingId = 20] [endId = 28]
                //
                //  G0050020.JPG -----> G0050028.JPG

                var numberOfPics = (endId - startingId) + 1;

                // Some fields are unknown
                // file.t ? values I have seen: 'b' 't'
                // file.m ? always an empty array
            }

            console.log('[url] = ', 'http://' + cam._ip + '/videos/DCIM/' + directory.d + '/' + file.n);
        });
    });
});
