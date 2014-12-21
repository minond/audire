'use strict';

var CLIENT_PARAM = '?client_id=%s',
    TRACK_URL = 'http://api.soundcloud.com/tracks/%s.json' + CLIENT_PARAM;

var Q = require('Q'),
    inherits = require('util').inherits,
    format = require('util').format;

var Source = require('./source'),
    Song = require('./song'),
    request = require('./request');

/**
 * @constructor
 * @class Soundcloud
 * @param {String} client_id
 */
function Soundcloud(client_id) {
    this.client_id = client_id;
}

inherits(Soundcloud, Source);

/**
 * @method getSong
 * @param {String} id
 * @return {Song}
 */
Soundcloud.prototype.getSong = function (id) {
    var url = format(TRACK_URL, id, this.client_id),
        deferred = Q.defer(),
        song;

    request(url, function (err, res, body) {
        if (err) {
            deferred.reject(err);
        } else {
            try {
                song = JSON.parse(body);
                song.stream_url += format(CLIENT_PARAM, this.client_id);
                song.artist = song.user.username;
                deferred.resolve(new Song(song));
            } catch (ex) {
                deferred.reject(ex);
            }
        }
    }.bind(this));

    return deferred.promise;
};

module.exports = Soundcloud;
