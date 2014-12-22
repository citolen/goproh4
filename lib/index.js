var GoPro = require('./constant.js');
var when = require('when');
var request = require('request');
var dgram = require('dgram');
var fs  = require("fs");

GoPro = GoPro || {};

GoPro.Camera = function (options) {

    'use strict';

    var options = options || {};

    this._ip = options.ip || '10.5.5.9';

    this._broadcastip = options.broadcastip || '10.5.5.255';

    this._status = {};

    this._mac = options.mac;

    if (!this._mac)
        retrieveMacAddress(this);
};

function retrieveMacAddress(cam) {

    'use strict';

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

    'use strict';

    var self = this;
    var promise = when.promise(function (resolve, reject, notify) {
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
            }
            reject(error);
        });
    });
    return (promise);
};

GoPro.Camera.prototype.mode = function (mode, submode) {

    'use strict';

    var self = this;
    var promise = when.promise(function (resolve, reject, notify) {
        if (mode && submode) {
            request('http://' + self._ip + '/gp/gpControl/command/sub_mode?mode=' + mode + '&sub_mode=' + submode, function (error, response, body) {
                if (!error && response.statusCode == 200) {
                    resolve();
                    return;
                }
                reject(error);
            });
        } else {
            request('http://' + self._ip + '/gp/gpControl/command/mode?p=' + mode, function (error, response, body) {
                if (!error && response.statusCode == 200) {
                    resolve();
                    return;
                }
                reject(error);
            });
        }
    });
    return (promise);
};

GoPro.Camera.prototype.start = function () {

    'use strict';

    var self = this;
    var promise = when.promise(function (resolve, reject, notify) {
        request('http://' + self._ip + '/gp/gpControl/command/shutter?p=1', function (error, response, body) {
            if (!error && response.statusCode == 200) {
                resolve();
            }
            reject(error);
        });
    });
    return (promise);
};

GoPro.Camera.prototype.stop = function () {

    'use strict';

    var self = this;
    var promise = when.promise(function (resolve, reject, notify) {
        request('http://' + self._ip + '/gp/gpControl/command/shutter?p=0', function (error, response, body) {
            if (!error && response.statusCode == 200) {
                resolve();
            }
            reject(error);
        });
    });
    return (promise);
};

GoPro.Camera.prototype.set = function (setting_id, setting_value) {

    'use strict';

    if (setting_id === undefined && setting_value === undefined)
        return (undefined);

    var self = this;
    var promise = when.promise(function (resolve, reject, notify) {
        if (setting_id !== undefined && setting_value !== undefined) {
            request('http://' + self._ip + '/gp/gpControl/setting/' + setting_id + '/' + setting_value, function (error, response, body) {
                if (!error && response.statusCode == 200) {
                    resolve();
                    return;
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
                }
                reject(error);
            });
        }
    });
    return (promise);
};

GoPro.Camera.prototype.powerOn = function () {

    'use strict';

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

    'use strict';

    var self = this;
    var promise = when.promise(function (resolve, reject, notify) {
        request('http://' + self._ip + '/gp/gpControl/command/system/sleep', function (error, response, body) {
            if (!error && response.statusCode == 200) {
                resolve();
            }
            reject(error);
        });
    });
    return (promise);
};

GoPro.Camera.prototype.listMedia = function () {

    'use strict';

    var self = this;
    var promise = when.promise(function (resolve, reject, notify) {
        request('http://' + self._ip + '/gp/gpMediaList', function (error, response, body) {
            if (!error && response.statusCode == 200) {
                try {
                    resolve(JSON.parse(body));
                } catch (e) {
                    reject(e);
                }
            }
            reject(error);
        });
    });
    return (promise);
};

GoPro.Camera.prototype.getMedia = function(url, path) {

    'use strict'

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

    'use strict';

    var self = this;
    var promise = when.promise(function (resolve, reject, notify) {
        request('http://' + self._ip + '/gp/gpControl/command/storage/delete/all', function (error, response, body) {
            if (!error && response.statusCode == 200) {
                try {
                    resolve(JSON.parse(body));
                } catch (e) {
                    reject(e);
                }
            }
            reject(error);
        });
    });
    return (promise);
};

GoPro.Camera.prototype.deleteLast = function () {

    'use strict';

    var self = this;
    var promise = when.promise(function (resolve, reject, notify) {
        request('http://' + self._ip + '/gp/gpControl/command/storage/delete/last', function (error, response, body) {
            if (!error && response.statusCode == 200) {
                try {
                    resolve(JSON.parse(body));
                } catch (e) {
                    reject(e);
                }
            }
            reject(error);
        });
    });
    return (promise);
};


GoPro.Camera.prototype.videoInfo = function (video_path) {

    'use strict';

    var self = this;
    var promise = when.promise(function (resolve, reject, notify) {
        request('http://' + self._ip + '/gp/gpMediaMetadata?p=' + video_path + '&t=videoinfo', function (error, response, body) {
            if (!error && response.statusCode == 200) {
                try {
                    resolve(JSON.parse(body));
                } catch (e) {
                    reject(e);
                }
            }
            reject(error);
        });
    });
    return (promise);
};

module.exports = GoPro;
