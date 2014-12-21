'use strict';

function Song(info) {
    this.stream_url = info.stream_url;
    this.artwork_url = info.artwork_url;
    this.permalink_url = info.permalink_url;
}

module.exports = Song;
