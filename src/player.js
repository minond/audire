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
    window.player = this;
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

/**
 * @method next
 * @return {Player}
 */
Player.prototype.next = function () {
    var curr = this.playlist.indexOf(this.song) + 1,
        next = curr % this.playlist.length;

    return this.load(this.playlist[ next ]);
};

/**
 * @method prev
 * @return {Player}
 */
Player.prototype.prev = function () {
    var curr = this.playlist.indexOf(this.song) - 1,
        prev = curr % this.playlist.length;

    return this.load(this.playlist[ prev ]);
};

module.exports = Player;
