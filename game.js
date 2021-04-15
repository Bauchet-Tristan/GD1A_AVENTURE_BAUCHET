var config = {
    type: Phaser.AUTO,
    width: 1600,
    height: 1280,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 0 },
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
var score = 5;
var gameOver = false;

//Variable de deplacement//


///////////////////////////



var game = new Phaser.Game(config);