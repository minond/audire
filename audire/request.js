'use strict';

var browser = require('in-browser');

if (browser) {
    module.exports = require('browser-request');
} else {
    module.exports = require('request');
}
