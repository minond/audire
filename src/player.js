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
 * @param {Song[]} songs
 * @return {Player}
 */
Player.prototype.setPlaylist = function (songs) {
    this.playlist = songs;
};

module.exports = Player;
