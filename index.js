var Q = require('Q'),
    Player = require('./src/player'),
    Soundcloud = require('./src/soundcloud'),
    browser = require('in-browser');

var soundcloud = new Soundcloud('96b942eb086a5093d4ea08ab69c5a16b');

var player, btn_play, btn_pause;

soundcloud.getSong('165098282').then(function (song) {
    console.log(song);

    if (browser) {
        player.play(song.stream_url);
    }
});

// Q.all([
//     soundcloud.getSong('165098282'),
//     soundcloud.getSong('165098282'),
//     soundcloud.getSong('165098282')
// ]).then(function () {
//     console.log(arguments);
// })

if (browser) {
    player = new Player(document);
    btn_play = document.querySelector('#play');
    btn_pause = document.querySelector('#pause');

    btn_play.addEventListener('click', player.audio.play.bind(player.audio));
    btn_pause.addEventListener('click', player.audio.pause.bind(player.audio));

    player.audio.addEventListener('loadstart', function (ev) {
        console.log('loading');
    });

    player.audio.addEventListener('seeking', function (ev) {
        console.log('seeking');
    });

    player.audio.addEventListener('canplay', function (ev) {
        console.log('done loading');
    });

    player.audio.addEventListener('ended', function (ev) {
        console.log('ended');
    });

    player.audio.addEventListener('timeupdate', function (ev) {
        console.log(ev.target.currentTime.toString(), '/', ev.target.duration.toString());
    });
}
