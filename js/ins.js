var insState = {
  create: function() {

		var fondo = game.add.sprite(0, 0, 'win');

		var winLabel = game.add.text(280, 100, 'INSTRUCCIONES', {
			font: '80px Arial', 
			fill: '#4f1c1c',
			stroke: '#2A120A',
			strokeThickness: 10
		});

		var texto = game.add.sprite(game.world.centerX-385, game.world.height-355, 'inst');


		var start = game.add.button(game.world.centerX - 80	, game.world.height-95, 'botonI', this.menu, this, 0, 1, 2);
		var continuar = game.add.text(game.world.centerX - 55, game.world.height-85, 'ENTENDIDO', {
			font: '20px Arial',
			fill: '#4f1c1c',
			stroke: '#000000',
			strokeThickness: 1
		});

	},
	menu: function() {
		game.state.start('menu');
	},
}
