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

GoPro.Camera.prototype.status = function (id) {
    var self = this;
    var retries = 0;
    var promise = when.promise(function action(resolve, reject, notify) {
        request('http://' + self._ip + '/gp/gpControl/status', function (error, response, body) {
            if (!error && response.statusCode == 200) {
                try
                {
                    self._status = JSON.parse(body);
                    if (id !== undefined) {
                        resolve(self._status.status[id]);
                        return;
                    }
                    resolve(self._status);
                } catch (e) {
                    reject(e);
                }
                return;
            } else if (!error && response.statusCode == 500) {
                if (++retries < GoPro.maxRetries) {
                    return setTimeout(action.bind(self, resolve, reject, notify), GoPro.retryTimeout);
                } else {
                    reject(GoPro.busyError);
                }
            }
            reject(error);
        });
    });
    return (promise);
};

GoPro.Camera.prototype.mode = function (mode, submode) {
    var self = this;
    var retries = 0;
    var promise = when.promise(function action(resolve, reject, notify) {
        if (mode && submode) {
            request('http://' + self._ip + '/gp/gpControl/command/sub_mode?mode=' + mode + '&sub_mode=' + submode, function (error, response, body) {
                if (!error && response.statusCode == 200) {
                    resolve();
                    return;
                } else if (!error && response.statusCode == 500) {
                    if (++retries < GoPro.maxRetries) {
                        return setTimeout(action.bind(self, resolve, reject, notify), GoPro.retryTimeout);
                    } else {
                        reject(GoPro.busyError);
                    }
                }
                reject(error);
            });
        } else {
            request('http://' + self._ip + '/gp/gpControl/command/mode?p=' + mode, function (error, response, body) {
                if (!error && response.statusCode == 200) {
                    resolve();
                    return;
                } else if (!error && response.statusCode == 500) {
                    if (++retries < GoPro.maxRetries) {
                        return setTimeout(action.bind(self, resolve, reject, notify), GoPro.retryTimeout);
                    } else {
                        reject(GoPro.busyError);
                    }
                }
                reject(error);
            });
        }
    });
    return (promise);
};

GoPro.Camera.prototype.start = function () {
    var self = this;
    var retries = 0;
    var promise = when.promise(function action(resolve, reject, notify) {
        request('http://' + self._ip + '/gp/gpControl/command/shutter?p=1', function (error, response, body) {
            if (!error && response.statusCode == 200) {
                resolve();
            } else if (!error && response.statusCode == 500) {
                if (++retries < GoPro.maxRetries) {
                    return setTimeout(action.bind(self, resolve, reject, notify), GoPro.retryTimeout);
                } else {
                    reject(GoPro.busyError);
                }
            }
            reject(error);
        });
    });
    return (promise);
};

GoPro.Camera.prototype.stop = function () {
    var self = this;
    var retries = 0;
    var promise = when.promise(function action(resolve, reject, notify) {
        request('http://' + self._ip + '/gp/gpControl/command/shutter?p=0', function (error, response, body) {
            if (!error && response.statusCode == 200) {
                resolve();
            } else if (!error && response.statusCode == 500) {
                if (++retries < GoPro.maxRetries) {
                    return setTimeout(action.bind(self, resolve, reject, notify), GoPro.retryTimeout);
                } else {
                    reject(GoPro.busyError);
                }
            }
            reject(error);
        });
    });
    return (promise);
};

GoPro.Camera.prototype.set = function (setting_id, setting_value) {
    if (setting_id === undefined && setting_value === undefined) {
        return (undefined);
    }

    var self = this;
    var retries = 0;
    var promise = when.promise(function action(resolve, reject, notify) {
        if (setting_id !== undefined && setting_value !== undefined) {
            request('http://' + self._ip + '/gp/gpControl/setting/' + setting_id + '/' + setting_value, function (error, response, body) {
                if (!error && response.statusCode == 200) {
                    resolve();
                    return;
                } else if (!error && response.statusCode == 500) {
                    if (++retries < GoPro.maxRetries) {
                        return setTimeout(action.bind(self, resolve, reject, notify), GoPro.retryTimeout);
                    } else {
                        reject(GoPro.busyError);
                    }
                }
                reject(error);
            });
        } else {
            request('http://' + self._ip + '/gp/gpControl/status', function (error, response, body) {
                if (!error && response.statusCode == 200) {
                    try
                    {
                        self._status = JSON.parse(body);
                        resolve(self._status.settings[setting_id]);
                    } catch (e) {
                        reject(e);
                    }
                    return;
                } else if (!error && response.statusCode == 500) {
                    if (++retries < GoPro.maxRetries) {
                        return setTimeout(action.bind(self, resolve, reject, notify), GoPro.retryTimeout);
                    } else {
                        reject(GoPro.busyError);
                    }
                }
                reject(error);
            });
        }
    });
    return (promise);
};

GoPro.Camera.prototype.powerOn = function () {
    if (this._mac === undefined) {
        console.log('[failure] MAC address unknown');
        return;
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
    var retries = 0;
    var promise = when.promise(function action(resolve, reject, notify) {
        request('http://' + self._ip + '/gp/gpControl/command/system/sleep', function (error, response, body) {
            if (!error && response.statusCode == 200) {
                resolve();
            } else if (!error && response.statusCode == 500) {
                if (++retries < GoPro.maxRetries) {
                    return setTimeout(action.bind(self, resolve, reject, notify), GoPro.retryTimeout);
                } else {
                    reject(GoPro.busyError);
                }
            }
            reject(error);
        });
    });
    return (promise);
};

GoPro.Camera.prototype.listMedia = function () {
    var self = this;
    var retries = 0;
    var promise = when.promise(function action(resolve, reject, notify) {
        request('http://' + self._ip + '/gp/gpMediaList', function (error, response, body) {
            if (!error && response.statusCode == 200) {
                try {
                    resolve(JSON.parse(body));
                } catch (e) {
                    reject(e);
                }
            } else if (!error && response.statusCode == 500) {
                if (++retries < GoPro.maxRetries) {
                    return setTimeout(action.bind(self, resolve, reject, notify), GoPro.retryTimeout);
                } else {
                    reject(GoPro.busyError);
                }
            }
            reject(error);
        });
    });
    return (promise);
};

GoPro.Camera.prototype.getMedia = function(url, path) {
    var self = this;
    var promise = when.promise(function (resolve, reject, notify) {
        var name = url.split("/");
        name = path+'/'+name[name.length-1];
        console.log("GET", url);
        console.log('TO', name);
        var out = fs.createWriteStream(name);
        out.on('error' ,function(err){ console.log("[stream error]", err); reject(err); });
        out.on('end'   ,function()   { console.log("[stream end]"       ); });
        out.on('finish',function()   { console.log("[stream finish]"    ); });
        out.on('close' ,function()   { console.log("[stream close]"     ); resolve(name)});

        var req = request(url);
        req.on('error', function(err){ console.log("[request error]", err); reject(err); });
        req.pipe(out);
    });
    return (promise);

}

GoPro.Camera.prototype.deleteAll = function () {
    var self = this;
    var retries = 0;
    var promise = when.promise(function action(resolve, reject, notify) {
        request('http://' + self._ip + '/gp/gpControl/command/storage/delete/all', function (error, response, body) {
            if (!error && response.statusCode == 200) {
                try {
                    resolve(JSON.parse(body));
                } catch (e) {
                    reject(e);
                }
            } else if (!error && response.statusCode == 500) {
                if (++retries < GoPro.maxRetries) {
                    return setTimeout(action.bind(self, resolve, reject, notify), GoPro.retryTimeout);
                } else {
                    reject(GoPro.busyError);
                }
            }
            reject(error);
        });
    });
    return (promise);
};

GoPro.Camera.prototype.deleteLast = function () {
    var self = this;
    var retries = 0;
    var promise = when.promise(function action(resolve, reject, notify) {
        request('http://' + self._ip + '/gp/gpControl/command/storage/delete/last', function (error, response, body) {
            if (!error && response.statusCode == 200) {
                try {
                    resolve(JSON.parse(body));
                } catch (e) {
                    reject(e);
                }
            } else if (!error && response.statusCode == 500) {
                if (++retries < GoPro.maxRetries) {
                    return setTimeout(action.bind(self, resolve, reject, notify), GoPro.retryTimeout);
                } else {
                    reject(GoPro.busyError);
                }
            }
            reject(error);
        });
    });
    return (promise);
};


GoPro.Camera.prototype.videoInfo = function (video_path) {
    var self = this;
    var retries = 0;
    var promise = when.promise(function action(resolve, reject, notify) {
        request('http://' + self._ip + '/gp/gpMediaMetadata?p=' + video_path + '&t=videoinfo', function (error, response, body) {
            if (!error && response.statusCode == 200) {
                try {
                    resolve(JSON.parse(body));
                } catch (e) {
                    reject(e);
                }
            } else if (!error && response.statusCode == 500) {
                if (++retries < GoPro.maxRetries) {
                    return setTimeout(action.bind(self, resolve, reject, notify), GoPro.retryTimeout);
                } else {
                    reject(GoPro.busyError);
                }
            }
            reject(error);
        });
    });
    return (promise);
};

module.exports = GoPro;
