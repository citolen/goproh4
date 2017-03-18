//HDR example

var BRACKET=3;
var INTERVAL=5000; //miliseconds
var STEPS=1;
var BRACKET_VALUE = ["P2","P0","M2"];
var GoPro = require('../lib/index.js');
var cam = new GoPro.Camera();
cam.mode(GoPro.Settings.Modes.Photo, GoPro.Settings.Submodes.Photo.Single).then(function () {
for(i=0; i < BRACKET; i++){
	console.log("Bracket: " + i);
	//set photo EV
	cam.set(GoPro.Settings.PHOTO_PROTUNE_EV, eval('GoPro.Settings.PhotoProtuneEV.' + BRACKET_VALUE[i]));
	cam.start();
}
});
