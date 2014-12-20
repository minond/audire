'use strict';

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
    return util.format('http://api.soundcloud.com/tracks/%s/stream?client_id=%s',
        id, this.client_id);
};

module.exports = Soundcloud;
