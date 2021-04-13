var config = {
    type: Phaser.AUTO,
    width: 3200,
    height: 640,
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

//this.player=0; //sa c'est pour les variable locale dans les scene

//this.droitText = this.add.text(20,20,(''), { fontSize: '22px', fill: '#FFF' }).setScrollFactor(0);
//this.droitText.setText('Droit = ' + this.droit);

var player;
var platforms;
var cursors;
var score = 5;
var platform1;
var gameOver = false;



var game = new Phaser.Game(config);