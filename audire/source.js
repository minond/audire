'use strict';

/**
 * @class Source
 * @constructor
 */
function Source() {}

/**
 * @method getSong
 * @return {Q.deferred}
 */
Source.prototype.getSong = function () {
    throw new Error('invalid source');
};

module.exports = Source;
