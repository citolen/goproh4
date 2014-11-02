goproh4
=======

Node.js module to control a GoPro Hero 4


```js
var GoPro = require('goproh4');

var cam = new GoPro.Camera();

cam.mode(GoPro.Settings.Modes.Video, GoPro.Settings.Submodes.Video.Video).then(function () {

    cam.set(GoPro.Settings.VIDEO_RESOLUTION, GoPro.Settings.VideoResolution.R1080S).then(function () {

        cam.set(GoPro.Settings.VIDEO_FPS, GoPro.Settings.VideoFPS.F60).then(function () {

            cam.start().then(function () {
            
                console.log('[video recording] = start');
                setTimeout(function () {
                
                    cam.stop().then(function () {
                        console.log('[video recording] = stop');
                    });
                }, 10000);
            });
        });
    });
});

```

### Installation

```bash
$ npm install goproh4
```

## Features

  * Get camera status
  * Get/Set camera settings
  * Take a picture, video, timelapse...
  * Turn ON/OFF the camera
  * List/retrieve information of the files on the camera

Note: Hero4 support only

## How to use it

Note: All functions except `GoPro.Camera.powerOn()` are using Promise

### Basics

Create camera object
```js
var GoPro = require('goproh4');

var cam = new GoPro.Camera();
```

Options can be given:
```js
var cam = new GoPro.Camera({
    ip: '10.5.5.9' /* Gopro ip, should be 10.5.5.9 except in remote mode */,
    broadcastip: '10.5.5.255' /* Broadcast ip of the gopro network, use to wake up the gopro (WOL protocol), should be 10.5.5.255 */,
    mac: '............' /* Mac address, used to wake up the gopro, should be set if the camera is off before launching the script, can be retrieve on the camera object cam._mac */
});
```

### Record a video
```js
/* Set video mode */
cam.mode(GoPro.Settings.Modes.Video, GoPro.Settings.Submodes.Video.Video).then(function () {
    /* Set video resolution */
    cam.set(GoPro.Settings.VIDEO_RESOLUTION, GoPro.Settings.VideoResolution.R1080S).then(function () {
        /* Set video framerate */
        cam.set(GoPro.Settings.VIDEO_FPS, GoPro.Settings.VideoFPS.F60).then(function () {
            /* start recording */
            cam.start().then(function () {
            
                console.log('[video recording] = start');
                setTimeout(function () {
                    /* Stop recording after 10s */
                    cam.stop().then(function () {
                        console.log('[video recording] = stop');
                    });
                }, 10000);
            });
        });
    });
});
```

### Settings

All the camera settings can be found in [lib/constant.js](lib/constant.js).
Accessible through the object
```js
GoPro.Settings
```
Settings name are in capital letters:
```js
GoPro.Settings.VIDEO_RESOLUTION
```
Settings value are in camelcase:
```js
GoPro.Settings.VideoResolution.R1080S
```

<br />
`GoPro.Camera.set(setting_id, setting_value)`
```js
cam.set(GoPro.Settings.VIDEO_RESOLUTION, GoPro.Settings.VideoResolution.R1080S).then(function () {
    console.log('[video resolution set to 1080p Superview]');
});
```

<br />
`GoPro.Camera.set(setting_id)`
```js
cam.set(GoPro.Settings.VIDEO_RESOLUTION).then(function (setting_value) {
    console.log('[video resolution is] = ', setting_value);
});
```

### Mode

Change gopro mode/submode using `GoPro.Camera.mode(mode, submode)`
```js
cam.mode(GoPro.Settings.Modes.Burst, GoPro.Settings.Submodes.Burst.Timelapse).then(function () {
    console.log('[gopro mode changed]');
});
```

Note: there is an hidden mode called `Broadcast`, for now I haven't been able to correctly use it, I suppose it's a coming feature.

### Status

Get gopro status using `GoPro.Camera.status(status_id)`

```js
cam.status(GoPro.Status.InternalBatteryLevel).then(function (status_value) {
    console.log('[battery level is] = ', status_value);
});
```

## Examples

Go to [examples](examples) for more

## Improvement

The goal would be to connect more than one gopro on the same network like the remote, if I get an hand on it I will try to reverse it.

### Have fun !