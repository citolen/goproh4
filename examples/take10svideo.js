var GoPro = require('../lib/index.js');

var cam = new GoPro.Camera();

/*
**  Set camera mode
*/
cam.mode(GoPro.Settings.Modes.Video, GoPro.Settings.Submodes.Video.Video).then(function () {

    /*
    **  Set camera video resolution
    */
    cam.set(GoPro.Settings.VIDEO_RESOLUTION, GoPro.Settings.VideoResolution.R1080S).then(function () {

        /*
        **  Set camera framerate
        */
        cam.set(GoPro.Settings.VIDEO_FPS, GoPro.Settings.VideoFPS.F60).then(function () {

            /*
            **  Begin to record
            */
            cam.start().then(function () {
                console.log('[video recording] = start');

                /*
                **  After 10s
                */
                setTimeout(function () {

                    /*
                    **  Stop recording
                    */
                    cam.stop().then(function () {
                        console.log('[video recording] = stop');
                    });
                }, 10000);
            });
        });
    });
});
