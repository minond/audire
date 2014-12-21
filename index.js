var Q = require('Q'),
    Ractive = require('ractive'),
    Player = require('./src/player'),
    Soundcloud = require('./src/soundcloud'),
    browser = require('in-browser');

var soundcloud = new Soundcloud('96b942eb086a5093d4ea08ab69c5a16b');

var player, btn_play, btn_pause, ractive;

soundcloud.getSong('180559953').then(function (song) {
    console.log(song);

    if (browser) {
        player.play(song);
    }
});

var fs = require('fs');

if (browser) {
    player = new Player(document);

    Ractive.defaults.data.nice_time = require('a-nice-time');
    ractive = new Ractive({
        el: '#player',
        template: fs.readFileSync('./player.html').toString(),
        data: player
    });

    window.player = player;
    window.ractive = ractive;

    btn_play = document.querySelector('#play');
    btn_pause = document.querySelector('#pause');

    // btn_play.addEventListener('click', player.audio.play.bind(player.audio));
    // btn_pause.addEventListener('click', player.audio.pause.bind(player.audio));

    player.on('play', function (song) {
        ractive.update('song');
    });

    player.audio.addEventListener('loadstart', function (ev) {
        console.log('loading');
    });

    player.audio.addEventListener('seeking', function (ev) {
        console.log('seeking');
    });

    player.audio.addEventListener('canplay', function (ev) {
        console.log('done loading');
        player.song.canplay = true;
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
