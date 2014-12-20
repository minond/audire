'use strict';

/**
 * @constructor
 * @class Player
 * @param {document} doc
 */
function Player(doc) {
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

module.exports = Player;
