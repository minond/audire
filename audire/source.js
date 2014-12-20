'use strict';

/**
 * @class Source
 * @constructor
 */
function Source() {}

/**
 * @method getStreamUrl
 * @return {String}
 */
Source.prototype.getStreamUrl = function () {
    throw new Error('invalid source');
};

module.exports = Source;
