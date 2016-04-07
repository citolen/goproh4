'use strict';

var GoPro =     require('./constant.js');
var when =      require('when');
var request =   require('request');
var dgram =     require('dgram');
var fs  =       require("fs");

GoPro = GoPro || {};
GoPro.maxRetries = 20;
GoPro.retryTimeout = 100;
GoPro.busyError = 'Camera is busy';
GoPro.keepAlivePeriod = 2500;
GoPro.keepAliveMessage = new Buffer("_GPHD_:0:0:2:0.000000\n");
GoPro.keepAlivePort = 8554;

GoPro.Camera = function (options) {

    options = options || {};

    this._ip = options.ip || '10.5.5.9';

    this._broadcastip = options.broadcastip || '10.5.5.255';

    this._status = {};

    this._mac = options.mac;

    if (!this._mac) {
        retrieveMacAddress(this);
    }
};

function retrieveMacAddress(cam) {
    request('http://' + cam._ip + '/gp/gpControl', function (error, response, body) {
        if (!error && response.statusCode == 200) {
            try
            {
                var infos = JSON.parse(body);
                var mac = infos.info.ap_mac; 
                for (var bytes = [], c = 0; c < mac.length; c += 2) {
                    bytes.push(parseInt(mac.substr(c, 2), 16));
                }
                cam._mac = bytes;
            } catch (e) {
            }
        }
    });
}

GoPro.Camera.prototype._retryPromise = function (action, maxRetries) {
    var retries = 0;
    maxRetries = maxRetries || GoPro.maxRetries;

    return when.promise(function func(resolve, reject, notify) {
        (function f() {
            when.promise(action)
                .then(function (data) {
                resolve(data);
            }, function (error) {
                if (++retries < maxRetries) {
                    return f();
                }
                reject(error);
            })
        })();
    });
};

GoPro.Camera.prototype.status = function (id) {
    var self = this;

    return this._retryPromise(function (resolve, reject) {
        var url = 'http://' + self._ip + '/gp/gpControl/status';

        request.get(url, function (error, response, body) {
            if (!error && response.statusCode == 200) {
                try {
                    var data = JSON.parse(body);
                    if (id !== undefined) {
                        return resolve(data.status[id]);
                    }
                    return resolve(data);
                } catch (e) {
                    return reject(e);
                }
            }
            if (!error && response.statusCode == 500) {
                return reject(GoPro.busyError);
            }
            return reject(error);
        });
    });
};

GoPro.Camera.prototype.mode = function (mode, submode) {
    var self = this;
    return this._retryPromise(function (resolve, reject) {
        if (mode !== undefined && submode !== undefined) {
            var url = 'http://' + self._ip + '/gp/gpControl/command/sub_mode?mode=' + mode + '&sub_mode=' + submode;

            request.get(url, function (error, response, body) {
                if (!error && response.statusCode == 200) {
                    return resolve();
                }
                if (!error && response.statusCode == 500) {
                    return reject(GoPro.busyError);
                }
                return reject(error);
            });
        } else {
            var url = 'http://' + self._ip + '/gp/gpControl/command/mode?p=' + mode;

            request.get(url, function (error, response, body) {
                if (!error && response.statusCode == 200) {
                    return resolve();
                }
                if (!error && response.statusCode == 500) {
                    return reject(GoPro.busyError);
                }
                return reject(error);
            });
        }
    });
};

GoPro.Camera.prototype.start = function () {
    var self = this;
    return this._retryPromise(function (resolve, reject) {
        var url = 'http://' + self._ip + '/gp/gpControl/command/shutter?p=1';

        request.get(url, function (error, response, body) {
            if (!error && response.statusCode == 200) {
                return resolve();
            }
            if (!error && response.statusCode == 500) {
                return reject(GoPro.busyError);
            }
            return reject(error);
        });
    });
};

GoPro.Camera.prototype.stop = function () {
    var self = this;
    return this._retryPromise(function (resolve, reject) {
        var url = 'http://' + self._ip + '/gp/gpControl/command/shutter?p=0';

        request.get(url, function (error, response, body) {
            if (!error && response.statusCode == 200) {
                return resolve();
            }
            if (!error && response.statusCode == 500) {
                return reject(GoPro.busyError);
            }
            return reject(error);
        });
    });
};

GoPro.Camera.prototype._keepAliveStart = function () {
    var self = this;
    if (this._keepAliveInterval) {
        this._keepAliveStop();
    }
    var kaInterval = function () {
        var client = dgram.createSocket("udp4");
        client.send(GoPro.keepAliveMessage, 0, GoPro.keepAliveMessage.length, GoPro.keepAlivePort, self._ip);
    };
    this._keepAliveInterval = setInterval(kaInterval, GoPro.keepAlivePeriod);
    kaInterval();
};

GoPro.Camera.prototype._keepAliveStop = function () {
    clearInterval(this._keepAliveInterval);
};

GoPro.Camera.prototype.startStream = function () {
    var self = this;
    return this._retryPromise(function (resolve, reject) {
        var url = 'http://' + self._ip + '/gp/gpControl/execute?p1=gpStream&c1=start';

        request.get(url, function (error, response, body) {
            if (!error && response.statusCode == 200) {
                self._keepAliveStart();
                return resolve();
            }
            if (!error && response.statusCode == 500) {
                return reject(GoPro.busyError);
            }
            return reject(error);
        });
    });
};

GoPro.Camera.prototype.restartStream = function () {
    var self = this;
    return this._retryPromise(function (resolve, reject) {
        var url = 'http://' + self._ip + '/gp/gpControl/execute?p1=gpStream&c1=restart';

        request.get(url, function (error, response, body) {
            if (!error && response.statusCode == 200) {
                self._keepAliveStart();
                return resolve();
            }
            if (!error && response.statusCode == 500) {
                return reject(GoPro.busyError);
            }
            return reject(error);
        });
    });
};

GoPro.Camera.prototype.stopStream = function () {
    var self = this;
    return this._retryPromise(function (resolve, reject) {
        var url = 'http://' + self._ip + '/gp/gpControl/execute?p1=gpStream&c1=stop';

        request.get(url, function (error, response, body) {
            if (!error && response.statusCode == 200) {
                self._keepAliveStop();
                return resolve();
            }
            if (!error && response.statusCode == 500) {
                return reject(GoPro.busyError);
            }
            return reject(error);
        });
    });
};

GoPro.Camera.prototype.set = function (setting_id, setting_value) {
    var self = this;
    return this._retryPromise(function (resolve, reject) {
        if (setting_id !== undefined && setting_value !== undefined) {
            var url = 'http://' + self._ip + '/gp/gpControl/setting/' + setting_id + '/' + setting_value;

            return request.get(url, function (error, response, body) {
                if (!error && response.statusCode == 200) {
                    return resolve();
                }
                if (!error && response.statusCode == 500) {
                    return reject(GoPro.maxRetries);
                }
                return reject(error);
            });
        }
        if (setting_id !== undefined) {
            var url = 'http://' + self._ip + '/gp/gpControl/status';

            return request.get(url, function (error, response, body) {
                if (!error && response.statusCode == 200) {
                    try {
                        var data = JSON.parse(body);
                        return resolve(data.settings[setting_id]);
                    } catch (e) {
                        return reject(e);
                    }
                }
                if (!error && response.statusCode == 500) {
                    return reject(GoPro.busyError);
                }
                return reject(error);
            });
        }
        reject('Invalid parameters');
    });
};

GoPro.Camera.prototype.powerOn = function () {
    // mac address should be 122 hex digits with no colons,
    // e.g. 'd6d9199e6855'
    if (this._mac === undefined) {
        return console.error('[failure] MAC address unknown');
    }

    var message = new Buffer(102);
    message[0] = 0xff;
    message[1] = 0xff;
    message[2] = 0xff;
    message[3] = 0xff;
    message[4] = 0xff;
    message[5] = 0xff;

    var mac = new Buffer(6);
    for (var i=0;i<12;i = i+2) {
        mac[i/2] = '0x' + this._mac[i] + this._mac[i+1];
    }

    for (i=0;i<16;i++) { for (var j=0;j<6;j++) { message[6+i*6+j] = mac[j]; } }
    var client = dgram.createSocket("udp4");

    client.send(message, 0, message.length, 9, this._ip);
    client.close;
};

GoPro.Camera.prototype.powerOff = function () {
    var self = this;
    return this._retryPromise(function (resolve, reject) {
        var url = 'http://' + self._ip + '/gp/gpControl/command/system/sleep';

        request.get(url, function (error, response, body) {
            if (!error && response.statusCode == 200) {
                return resolve();
            }
            if (!error && response.statusCode == 500) {
                return reject(GoPro.busyError);
            }
            return reject(error);
        });
    });
};

GoPro.Camera.prototype.listMedia = function () {
    var self = this;
    return this._retryPromise(function (resolve, reject) {
        var url = 'http://' + self._ip + '/gp/gpMediaList';

        request.get(url, function (error, response, body) {
            if (!error && response.statusCode == 200) {
                try {
                    return resolve(JSON.parse(body));
                } catch (e) {
                    return reject(e);
                }
            }
            if (!error && response.statusCode == 500) {
                return reject(GoPro.busyError);
            }
            return reject(error);
        });
    });
};

GoPro.Camera.prototype.getMediaStream = function (directory, filename) {
    var url = 'http://' + this._ip + '/videos/DCIM/' + directory + '/' + filename;
    return when.promise(function (resolve) {
        resolve(request.get(url));
    });
};

GoPro.Camera.prototype.getMedia = function (directory, filename, path) {
    var self = this;
    return when.promise(function (resolve, reject) {
        self.getMediaStream(directory, filename).then(function (stream) {
            stream.on('error', function (err) {
                reject(err);
            })
            .on('response', function(response) {
                if (response.statusCode !== 200) { reject(); }
                else {
                    var out = fs.createWriteStream(path);
                    out.on('error', function (err) {
                        reject(err);
                    });
                    out.on('finish', function () {
                        resolve(path);
                    });
                    stream.pipe(out);
                }
            });
        });
    });
};

GoPro.Camera.prototype.deleteAll = function () {
    var self = this;
    return this._retryPromise(function (resolve, reject) {
        var url = 'http://' + self._ip + '/gp/gpControl/command/storage/delete/all';

        request.get(url, function (error, response, body) {
            if (!error && response.statusCode == 200) {
                try {
                    return resolve(JSON.parse(body));
                } catch (e) {
                    return reject(e);
                }
            }
            if (!error && response.statusCode == 500) {
                return reject(GoPro.busyError);
            }
            return reject(error);
        });
    });
};

GoPro.Camera.prototype.deleteLast = function () {
    var self = this;
    return this._retryPromise(function (resolve, reject) {
        var url = 'http://' + self._ip + '/gp/gpControl/command/storage/delete/last';

        request.get(url, function (error, response, body) {
            if (!error && response.statusCode == 200) {
                try {
                    return resolve(JSON.parse(body));
                } catch (e) {
                    return reject(e);
                }
            }
            if (!error && response.statusCode == 500) {
                return reject(GoPro.busyError);
            }
            return reject(error);
        });
    });
};


GoPro.Camera.prototype.videoInfo = function (video_path) {
    var self = this;
    return this._retryPromise(function (resolve, reject) {
        var url = 'http://' + self._ip + '/gp/gpMediaMetadata?p=' + video_path + '&t=videoinfo';

        request.get(url, function (error, response, body) {
            if (!error && response.statusCode == 200) {
                try {
                    return resolve(JSON.parse(body));
                } catch (e) {
                    return reject(e);
                }
            }
            if (!error && response.statusCode == 500) {
                return reject(GoPro.busyError);
            }
            reject(error);
        });
    });
};

module.exports = GoPro;
