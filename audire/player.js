'use strict';

/**
 * @constructor
 * @class Player
 * @param {document} doc
 */
function Player(doc) {
    this.playlist = [];
    this.audio = doc.createElement('audio');
    doc.body.appendChild(this.audio);
}

/**
 * @method play
 * @param {String} [url]
 * @return {Player}
 */
Player.prototype.play = function (url) {
    if (url) {
        this.audio.src = url;
    }

    this.audio.play();
    return this;
};

/**
 * @param {Song[]} songs
 * @return {Player}
 */
Player.prototype.setPlaylist = function (songs) {
    this.playlist = songs;
}

module.exports = Player;
