'use strict';

var EventEmitter = require('events').EventEmitter,
    inherits = require('util').inherits;

/**
 * @constructor
 * @class Player
 * @param {document} doc
 */
function Player(doc) {
    this.playlist = [];
    this.song = null;
    this.audio = doc.createElement('audio');
    doc.body.appendChild(this.audio);
}

inherits(Player, EventEmitter);

/**
 * @method load
 * @param {Song} song
 * @return {Player}
 */
Player.prototype.load = function (song) {
    this.song = song;
    this.audio.src = song.stream_url;
    this.audio.play();
    this.emit('play', song);
    return this;
};

/**
 * @param {Song[]} songs
 * @return {Player}
 */
Player.prototype.setPlaylist = function (songs) {
    this.playlist = songs;
    this.emit('playlist', songs);

    if (songs.length) {
        this.load(songs[0]);
    }

    return this;
};

module.exports = Player;
