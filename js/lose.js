var loseAudio;

var loseState = {
	
	create: function() {
		loseAudio = game.add.audio('lose');
		loseAudio.play();
		
		var bg = game.add.tileSprite(0, 0, 1200, 600, 'over');

		var startLabel = game.add.text(game.world.centerX-230, game.world.height-80, 'Presiona la tecla "R" para reiniciar.', {
			font: '25px Arial',
			fill: '#ffffff',
			stroke: '#000',
			strokeThickness: 10
		});

		var wkey = game.input.keyboard.addKey(Phaser.Keyboard.R);
		wkey.onDown.addOnce(this.restart, this);
	},

	restart: function() {

		loseAudio.stop();
		game.state.start('menu');

	}

};