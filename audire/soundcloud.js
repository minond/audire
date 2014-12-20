'use strict';

var STREAM_URL = 'http://api.soundcloud.com/tracks/%s/stream?client_id=%s';

var Source = require('./source'),
    util = require('util');

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
 * @method getStreamUrl
 * @param {String} id
 * @return {String}
 */
Soundcloud.prototype.getStreamUrl = function (id) {
    return util.format(STREAM_URL, id, this.client_id);
};

module.exports = Soundcloud;
