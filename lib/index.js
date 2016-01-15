'use strict';

var GoPro = require('./constant.js');
var when = require('when');
var request = require('request');
var dgram = require('dgram');
var fs  = require("fs");

GoPro = GoPro || {};
GoPro.maxRetries = 20;
GoPro.retryTimeout = 100;
GoPro.busyError = 'Camera is busy';

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

    for (var j = 0; j < 16; ++j) {
        var c = 6 + j * this._mac.length;
        for (var i = 0; i < this._mac.length; ++i) {
            message[c + i] = this._mac[i];
        }
    }

    var client = dgram.createSocket("udp4");
    var c = 0;
    for (var i=0;i < 10; ++i) {
        client.send(message, 0, message.length, 9, this._broadcastip, function () { ++c; if (c !== 10) return; client.close(); });
    }
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
