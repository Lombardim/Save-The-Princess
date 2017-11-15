var game = new Phaser.Game(1200, 600, Phaser.AUTO, 'gameDiv');
game.state.add('boot', bootState);
game.state.add('load', loadState);
game.state.add('menu', menuState);
game.state.add('play1', level1State);
game.state.add('win', winState);
game.state.add('lose', loseState);
game.state.add('ins', insState);

game.state.start('boot');
