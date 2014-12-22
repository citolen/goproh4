var GoPro = require('../lib/index.js');

var cam = new GoPro.Camera();

/*
**  get media 
*/
var url = 'http://10.5.5.9/videos/DCIM/100GOPRO/GOPR0125.JPG';
cam.getMedia(url, __dirname)
	.then(function (file) {console.log('[media downloaded]', file);})
	.catch(function (err) {console.log('[media download error]', err); });
