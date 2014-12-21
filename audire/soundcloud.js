'use strict';

var TRACK_URL = 'http://api.soundcloud.com/tracks/%s.json?client_id=%s';

var Q = require('Q'),
    util = require('util'),
    request = require('request'),
    browser = require('in-browser');

var Source = require('./source'),
    Song = require('./song');

if (browser) {
    request = require('browser-request');
}

/**
 * @constructor
 * @class Soundcloud
 * @param {String} client_id
 */
function Soundcloud(client_id) {
    this.client_id = client_id;
}

util.inherits(Soundcloud, Source);

/**
 * @method getSong
 * @param {String} id
 * @return {Song}
 */
Soundcloud.prototype.getSong = function (id) {
    var url = util.format(TRACK_URL, id, this.client_id),
        deferred = Q.defer(),
        song;

    request(url, function (err, res, body) {
        if (err) {
            deferred.reject(err);
        } else {
            try {
                song = new Song(JSON.parse(body));
                song.stream_url += '?client_id=' + this.client_id;
                deferred.resolve(song);
            } catch (ex) {
                deferred.reject(ex);
            }
        }
    }.bind(this));

    return deferred.promise;
};

module.exports = Soundcloud;
