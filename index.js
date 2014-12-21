var Q = require('Q'),
    Ractive = require('ractive'),
    Player = require('./src/player'),
    Soundcloud = require('./src/soundcloud'),
    browser = require('in-browser');

var soundcloud = new Soundcloud('96b942eb086a5093d4ea08ab69c5a16b');

var player, ractive;

soundcloud.getSong('135465952').then(function (song) {
    console.log(song);

    if (browser) {
        player.play(song);
    }
});

var fs = require('fs');

if (browser) {
    player = new Player(document);
    player.nice_time = require('a-nice-time');

    ractive = new Ractive({
        el: '#player',
        template: fs.readFileSync('./player.html').toString(),
        data: player,
        player: player,
        play: function () {
            this.player.audio.play();
        },
        pause: function () {
            this.player.audio.pause();
        }
    });

    window.player = player;
    window.ractive = ractive;

    player.on('play', function (song) {
        ractive.update('song');
    });

    player.audio.addEventListener('loadstart', function (ev) {
        console.log('loading');
        player.audio.canplay = false;
    });

    player.audio.addEventListener('seeking', function (ev) {
        console.log('seeking');
    });

    player.audio.addEventListener('canplay', function (ev) {
        console.log('done loading');
        player.audio.canplay = true;
        // player.audio.currentTime = 60;
    });

    player.audio.addEventListener('ended', function (ev) {
        console.log('ended');
    });

    player.audio.addEventListener('timeupdate', function (ev) {
        // console.log(ev.target.currentTime.toString(), '/', ev.target.duration.toString());
        ractive.update('audio');
    });
}
