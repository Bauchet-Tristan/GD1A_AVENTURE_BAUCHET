var config = {
    type: Phaser.AUTO,
    width: 850,
    height: 650,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 0 },
            debug: true
        }
    },
    scene: [Menu,lvl1,lvl2],
    scale: {
        zoom: 2
    }
};

//this.player=0; //sa c'est pour les variable locale dans les scene

//this.droitText = this.add.text(20,20,(''), { fontSize: '22px', fill: '#FFF' }).setScrollFactor(0);
//this.droitText.setText('Droit = ' + this.droit);

//plateformes.setCollisionByProperty({ estSolide: true });


//var temporaire
var score = 5;
var vieTexte;

//var globale
var gameOver = false;
var tp=false;

var left;
var right;
var up;
var down;
var space;

var cursors;

//////var joueur//////
var player;
var lastDirection ="left";

//vie
var vie = 1;
var invulnerable=200;

//Armes
var knife;
var knifeUnlock = false;
var knives;
var timerknives = 200;
var knivesOut = false;

//Key-door
var key;
var key1=true;
var door;
var door1=false;
var keyNumber=0;



//enemie
var wolf;
var timeMove =0;
var wolfDead1=false;
var wolfDead2=false;
var wolf1=true;

//Variable de deplacement//


///////////////////////////

        /*class knives extends Phaser.Physics.Arcade.Sprite
        {
            constructor(scene)
            {
                super(scene);
                    this.scene = scene;
                    this.knives = this.scene.physics.add.image(0,0,'knife');
            }
        }
        
        knives = new knives(this);*/

var game = new Phaser.Game(config);