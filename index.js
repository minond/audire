'use strict';

var Q = require('q'),
    Player = require('./src/player'),
    Soundcloud = require('./src/soundcloud'),
    ui = require('./player/ui');

var soundcloud = new Soundcloud('96b942eb086a5093d4ea08ab69c5a16b'),
    player = new Player(document);

Q.all([
    soundcloud.getSong('129517248'),
    soundcloud.getSong('132883911'),
    soundcloud.getSong('166222301'),
    soundcloud.getSong('142744960'),
    soundcloud.getSong('116860041'),
    soundcloud.getSong('180559953')
]).then(player.setPlaylist.bind(player));

require('./player/styles.less');

ui('#player', player);
