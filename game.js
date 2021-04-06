var config = {
    type: Phaser.AUTO,
    width: 1000,
    height: 1000,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 340 },
            debug: true
        }
    },
    scene: [Menu,lvl1],
    scale: {
        zoom: 2
    }
};

var player;
var platforms;
var cursors;
var score = 0;
var gameOver = false;

var game = new Phaser.Game(config);


