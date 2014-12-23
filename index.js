'use strict';

var Player = require('./src/player'),
    Soundcloud = require('./src/soundcloud'),
    ui = require('./player/ui');

var soundcloud = new Soundcloud('96b942eb086a5093d4ea08ab69c5a16b'),
    player = new Player(document);

soundcloud.getSong('180559953').then(function (song) {
    console.log(song);
    player.load(song);
    player.audio.pause();
});

ui('#player', player);
