'use strict';

var Q = require('q'),
    Player = require('./src/player'),
    Soundcloud = require('./src/soundcloud'),
    ui = require('./player/ui');

var soundcloud = new Soundcloud('96b942eb086a5093d4ea08ab69c5a16b'),
    player = new Player(document);

soundcloud.getSong('109412481').then(player.addSong.bind(player));
soundcloud.getSong('93866105' ).then(player.addSong.bind(player));
soundcloud.getSong('129517248').then(player.addSong.bind(player));
soundcloud.getSong('132883911').then(player.addSong.bind(player));
soundcloud.getSong('166222301').then(player.addSong.bind(player));
soundcloud.getSong('142744960').then(player.addSong.bind(player));
soundcloud.getSong('116860041').then(player.addSong.bind(player));
soundcloud.getSong('180559953').then(player.addSong.bind(player));
soundcloud.getSong('154798838').then(player.addSong.bind(player));
soundcloud.getSong('115780423').then(player.addSong.bind(player));
soundcloud.getSong('165098282').then(player.addSong.bind(player));

require('./player/styles.less');

ui('#player', player);
