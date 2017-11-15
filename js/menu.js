var menuState = {

	create: function() {

		var fondo = game.add.sprite(0, 0, 'menuF');
		var cage  = game.add.sprite(1160, -10, 'cage');

		var nameLabel = game.add.text(225, 15, 'Save The Princess', {
			font: '80px Arial',
			fill: '#81F7F3',
			stroke: '#0B0B61',
			strokeThickness: 10
		});

		var startLabel = game.add.text(game.world.centerX-210, game.world.height-50, 'Presione la tecla "S" para empezar', {
			font: '25px Arial',
			fill: '#ffffff',
			stroke: '#000',
			strokeThickness: 6
		});

		var Skey = game.input.keyboard.addKey(Phaser.Keyboard.S);
		Skey.onDown.addOnce(menuState.start, this);

		var start = game.add.button(game.world.centerX - 250, game.world.height-150, 'boton', menuState.start, this, 2, 1, 0);
		var startT  = game.add.text(game.world.centerX - 240, game.world.height-142, 'COMENZAR', {
			font: '25px Arial',
			fill: '#A4A4A4',
			stroke: '#2E2E2E',
			strokeThickness: 4});

		var ins = game.add.button(game.world.centerX + 60, game.world.height-150, 'boton', menuState.ins, this, 2, 1, 0);
		starT = game.add.text(game.world.centerX + 100, game.world.height-142, 'AYUDA', {
			font: '25px Arial',
			fill: '#A4A4A4',
			stroke: '#2E2E2E',
			strokeThickness: 4});


	},

	start: function() {
		game.state.start('play1');
	},
	ins: function() {
		game.state.start('ins');
	}
};
