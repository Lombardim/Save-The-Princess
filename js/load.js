var loadState = {

  preload:function () {

		var loadingLabel = game.add.text(920, 520, 'CARGANDO...', {
			font: '30px Courier',
			fill: '#ffffff'
		});

        game.load.audio('collected', 'assets/collected.mp3');
        game.load.audio('door', 'assets/door.mp3');
        game.load.audio('salto', 'assets/jump.mp3');
        game.load.audio('victory', 'assets/victory.mp3');
        game.load.audio('gameover', 'assets/gameover.mp3');
        game.load.audio('lose', 'assets/lose.mp3');
        game.load.audio('main', 'assets/main.mp3');

        game.load.image('win', 'assets/win.png');
        game.load.image('cage', 'assets/cage.png');
        game.load.image('menuF', 'assets/mainMenu.png');
        game.load.image('over', 'assets/perdiste.png');
        game.load.image('fondo', 'assets/background.png');
        game.load.image('piso', 'assets/piso.png');
        game.load.image('platform', 'assets/plataforma.png');
        game.load.image('invisible', 'assets/invisible.png');
        game.load.image('key', 'assets/llave.png');
        game.load.image('inst', 'assets/inst.png');

        game.load.spritesheet('boton', 'assets/button.png', 170, 48);
        game.load.spritesheet('botonI', 'assets/botonI.png', 170, 48);
        game.load.spritesheet('puerta', 'assets/puerta.png', 40, 76);
        game.load.spritesheet('barril', 'assets/barril.png', 34, 34);
        game.load.spritesheet('princesa', 'assets/princesa.png', 28, 40);
        game.load.spritesheet('jugador', 'assets/player.png', 27, 43);
        game.load.spritesheet('estrella', 'assets/estrella.png', 32, 38);

	},

	create: function() {
		game.state.start('menu');
	}

};
