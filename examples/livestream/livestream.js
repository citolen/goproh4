var GoPro = require('../../lib/index.js');

var cam = new GoPro.Camera();

var express =       require('express');

cam.restartStream().then(function () {
    console.log('[livestream]', 'started');

    var STREAM_PORT =           8082;
    var WEBSOCKET_PORT =        8084;
    var STREAM_MAGIC_BYTES =    'jsmp';
    var width =                 320;
    var height =                240;

    var socketServer = new (require('ws').Server)({port: WEBSOCKET_PORT});

    socketServer.on('connection', function(socket) {
        var streamHeader = new Buffer(8);
        streamHeader.write(STREAM_MAGIC_BYTES);
        streamHeader.writeUInt16BE(width, 4);
        streamHeader.writeUInt16BE(height, 6);
        socket.send(streamHeader, {binary:true});

        console.log( 'New WebSocket Connection ('+socketServer.clients.length+' total)' );

        socket.on('close', function(code, message){
            console.log( 'Disconnected WebSocket ('+socketServer.clients.length+' total)' );
        });
    });

    socketServer.broadcast = function(data, opts) {
        for( var i in this.clients ) {
            if (this.clients[i].readyState == 1) {
                this.clients[i].send(data, opts);
            }
            else {
                console.log( 'Error: Client ('+i+') not connected.' );
            }
        }
    };

    var app = express();

    app.post('/publish', function (req, res) {
        console.log(
            'Stream Connected: ' + req.socket.remoteAddress +
            ':' + req.socket.remotePort + ' size: ' + width + 'x' + height
        );
        req.on('data', function(data){
            socketServer.broadcast(data, {binary:true});
        });
    });

    app.use('/index', express.static(__dirname + '/client'));

    app.listen(STREAM_PORT);

    var ffmpeg = require('child_process').spawn("ffmpeg", [
		"-f",
		"mpegts",
		"-i",
		"udp://" + cam._ip + ":8554",
		"-f",
		"mpeg1video",
		"-b",
		"800k",
		"-r",
        "30",
        "http://127.0.0.1:8082/publish"
		]);

    ffmpeg.stdout.pipe(process.stdout);
    ffmpeg.stderr.pipe(process.stdout);
});
