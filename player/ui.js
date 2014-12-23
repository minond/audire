'use strict';

var fs = require('fs');

var Ractive = require('ractive'),
    nice_time = require('a-nice-time'),
    template = fs.readFileSync('./player/index.html').toString();

/**
 * @function ui
 * @param {String} append_to
 * @param {Player} player
 * @return {Ractive}
 */
function ui(append_to, player) {
    var ui = new Ractive({
        el: append_to,
        template: template,
        data: player,
        load: player.load.bind(player),
        play: player.audio.play.bind(player.audio),
        pause: player.audio.pause.bind(player.audio)
    });

    player.nice_time = require('a-nice-time');

    player.on('play', function () {
        ui.update('song');
    });

    player.on('playlist', function () {
        ui.update('playlist');
    });

    player.audio.addEventListener('seeking', function (ev) {
        player.audio.seeking = true;
        ui.update('audio');
    });

    player.audio.addEventListener('canplay', function (ev) {
        player.audio.loading = false;
        player.audio.seeking = false;
        player.audio.canplay = true;
        ui.update('audio');
    });

    player.audio.addEventListener('timeupdate', function (ev) {
        ui.update('audio');
    });

    player.audio.addEventListener('loadstart', function (ev) {
        player.audio.loading = true;
        player.audio.canplay = false;
        ui.update('song');
    });

    return ui;
}

module.exports = ui;
