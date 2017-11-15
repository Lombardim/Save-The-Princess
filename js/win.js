	var winState = {
	create: function() {

		var fondo = game.add.tileSprite(0, 0, 1200, 600, 'win');

		var winLabel = game.add.text(400, 100, 'GANASTE!', {
			font: '80px Arial', 
			fill: '#4f1c1c',
			stroke: '#2A120A',
			strokeThickness: 10
		});

		var reiniciar = game.add.button(game.world.centerX - 80	, game.world.height-250, 'botonI', this.restart, this, 0, 1, 2);
		var startLabel = game.add.text(game.world.centerX-48, game.world.height-238, 'REINICIAR', {
			font: '20px Arial',
			fill: '#4f1c1c',
			stroke: '#000000',
			strokeThickness: 1
		});
		var startLabel = game.add.text(367, game.world.height-180, 'Presiona la tecla "R" para reiniciar.', {
			font: '30px Arial',
			fill: '#4f1c1c',
			stroke: '#2A120A',
			strokeThickness: 10
		});

		var wkey = game.input.keyboard.addKey(Phaser.Keyboard.R);
		wkey.onDown.addOnce(this.restart, this);

	},	

	restart: function() {
		game.state.start('menu');
	}
};