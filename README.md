goproh4
=======

Node.js module to control a GoPro Hero 4


```js
var GoPro = require('goproh4');

var cam = new GoPro.Camera();

// Set camera mode
cam.mode(GoPro.Settings.Modes.Video, GoPro.Settings.Submodes.Video.Video)

// Set camera resolution
.then(function () {
    return cam.set(GoPro.Settings.VIDEO_RESOLUTION, GoPro.Settings.VideoResolution.R1080S)
})

// Set camera framerate
.then(function () {
    return cam.set(GoPro.Settings.VIDEO_FPS, GoPro.Settings.VideoFPS.F60)
})

// Begin recording
.then(function () {
    console.log('[video]', 'started')
    return cam.start()
})

// Wait 10s
.delay(10000)

// Stop recording
.then(function () {
    console.log('[video]', 'stopped')
    return cam.stop()
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
  * View live video feed from within your browser
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
// Set camera mode
cam.mode(GoPro.Settings.Modes.Video, GoPro.Settings.Submodes.Video.Video)

// Set camera resolution
.then(function () {
    return cam.set(GoPro.Settings.VIDEO_RESOLUTION, GoPro.Settings.VideoResolution.R1080S)
})

// Set camera framerate
.then(function () {
    return cam.set(GoPro.Settings.VIDEO_FPS, GoPro.Settings.VideoFPS.F60)
})

// Begin recording
.then(function () {
    console.log('[video]', 'started')
    return cam.start()
})

// Wait 10s
.delay(10000)

// Stop recording
.then(function () {
    console.log('[video]', 'stopped')
    return cam.stop()
});
```

### Livestreaming from Web browser

Requirements:
- ffmpeg

1. Go to [livestream](examples/livestream) directory
2. `npm install`
3. `node livestream.js` (make sure you are connected to your GoPro's wifi before launching this command)
4. Open http://127.0.0.1:8082/index

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

## Documentation

| Methods | Description |
| ------- | ----------- |
| [`Camera.status([id])`](#status) | Get all status from camera or status equals to id |
| [`Camera.mode(mode [,submode])`](#mode) | Change GoPro's mode and optionally submode |
| [`Camera.start()`](#record-a-video) | Start recording video/picture/timelapse/... |
| [`Camera.stop()`](#record-a-video) | Stop recording video/timelapse |
| `Camera.startStream()` | Send command to the Camera to start streaming & send a keepalive command every 2,5s |
| `Camera.restartStream()` | Send command to the Camera to restart streaming & send a keepalive command every 2,5s |
| `Camera.stopStream()` | Send command to the Camera to stop streaming & stop sending the keepalive command |
| [`Camera.set(setting_id [,setting_value])`](#settings) | Set Camera setting to given value or optional get its value by not providing one |
| `Camera.powerOn()` | Turn on the Camera using Wake-on-Lan, Camera's MAC address needs to be known |
| `Camera.powerOff()` | Turn off the Camera |
| `Camera.listMedia()` | Get list of all media in the Camera's storage |
| `Camera.getMediaStream(directory, filename)` | Starts downloading media, sends back a stream |
| `Camera.getMedia(directory, filename, path)` | Download media to file |
| `Camera.deleteAll()` | Delete all media from Camera's storage |
| `Camera.deleteLast()` | Delete last media from Camera's storage  |
| `Camera.videoInfo(video_path)` | Get information about a video |

## Examples

Go to [examples](examples)
