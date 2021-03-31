var config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 340 },
            debug: true
        }
    },
    scene: [Menu,Menu2]
};

var game = new Phaser.Game(config);

