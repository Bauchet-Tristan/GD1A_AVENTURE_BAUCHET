
class lvl1 extends Phaser.Scene //
{
    constructor()
    {
        super("lvl1"); //nom = menu
    }

    init(data)
    {
        //dispo partout
    }


    preload ()
    {
        this.load.image("Phaser_tuilesdejeu", "tuilesJeu.png");
        this.load.tilemapTiledJSON("carte", "map.json");

        this.load.image("knife","assets/Knife.png");
        
        this.load.spritesheet('dude', 'assets/dude.png', { frameWidth: 32, frameHeight: 42 });
        this.load.spritesheet('wolf', 'assetsSide/wolf.png', { frameWidth: 211, frameHeight: 106 });
    }

    create ()
    {
        // chargement de la carte
        this.carteDuNiveau = this.add.tilemap("carte");

        // chargement du jeu de tuiles
        this.tileset = this.carteDuNiveau.addTilesetImage("tuiles_de_jeu","Phaser_tuilesdejeu");  
        
        // chargement du calque calque_background
        this.backgroundLayer = this.carteDuNiveau.createStaticLayer("calque_background_1",this.tileset,0,0);

        // chargement du calque calque_background_2
        this.objet = this.carteDuNiveau.createStaticLayer("objet",this.tileset,0,0);

        // chargement du calque calque_plateformes
        this.plateformes = this.carteDuNiveau.createStaticLayer("calque_plateformes",this.tileset,0,0);

        //plateformes.setCollisionByProperty({ estSolide: true });
        this.plateformes.setCollisionByExclusion(-1, true);

        this.objet.setCollisionByExclusion(-1, true);

        // The player and its settings
        player = this.physics.add.sprite(10, 10, 'dude');
        player.setCollideWorldBounds(true);

        // The ennemi and its settings
        wolf = this.physics.add.sprite(800, 500, 'wolf').setScale(0.5);
        wolf.setCollideWorldBounds(true);

        this.anims.create({
            key: 'left',
            frames: this.anims.generateFrameNumbers('dude', { start: 0, end: 3 }),
            frameRate: 10,
            repeat: -1
        });

        this.anims.create({
            key: 'turn',
            frames: [ { key: 'dude', frame: 4 } ],
            frameRate: 20
        });

        this.anims.create({
            key: 'right',
            frames: this.anims.generateFrameNumbers('dude', { start: 5, end: 8 }),
            frameRate: 10,
            repeat: -1
        });

        //////animation Wolf//////
        this.anims.create({
            key: 'WolfLeft',
            frames: this.anims.generateFrameNumbers('wolf', { start: 0, end: 11 }),
            frameRate: 10,
            repeat: -1
        });
    
        this.anims.create({
            key: 'WolfRight',
            frames: this.anims.generateFrameNumbers('wolf', { start: 12, end: 23 }),
            frameRate: 10,
            repeat: -1
        });

        // affiche vie 
        vieTexte = this.add.text(16, 16, 'vie: 0', { fontSize: '32px', fill: '#999' });

        //  Input Events
        this.cursors = this.input.keyboard.createCursorKeys();

        //on creer les projetciles
        knives = this.physics.add.image(0,0,'knife');
        knives.disableBody(true,true);

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


//////////player Collider//////////
        this.physics.add.collider(player, this.plateformes);
        this.physics.add.collider(player, this.objet);

        //Wolf collider
        this.physics.add.collider(wolf, this.plateformes);
        this.physics.add.collider(wolf, player,PlayerWolf);
    }

    

    update ()
    {
        if (gameOver)
        {
            player.x = 30;
            player.y = 30;
            vie = 3;
            gameOver = false;
            //return;
        }

        //Var timer update : //
        invulnerable++;
        timerknives++;

        //fonction ARMES : //


        //fonction  l'ennemie--wolf//
        Wolf();

//////////////Fonction UI//////////////
        //Actualise la vie
        Life();

        

        ///////////////////////////////////////////////////
        /////////////   Déplacement basic :   /////////////   

        /// On enregistre les commandes ///
        this.left = this.cursors.left.isDown ? true : false;
        this.right = this.cursors.right.isDown ? true : false;
        this.up = this.cursors.up.isDown ? true : false;
        this.down = this.cursors.down.isDown ? true : false;


        if (this.left == true)
        {
            player.setVelocityX(-150);
            player.anims.play('left', true);
        }
        if (this.right == true)
        {
            player.setVelocityX(150);
            player.anims.play('right', true);
        }
        if (this.up == true) 
        {
            player.setVelocityY(-150);
        }  
        if (this.down == true) 
        {
            player.setVelocityY(150);
        }  
        

        ///equilibre la vitesse des deplacement en diagonale
        if(this.left == true && this.up == true)
        {
            player.setVelocityX(-110);
            player.setVelocityY(-110);
        }

        if(this.left == true && this.down == true)
        {
            player.setVelocityX(-110);
            player.setVelocityY(110);
        }

        if(this.right == true && this.down == true)
        {
            player.setVelocityX(110);
            player.setVelocityY(110);
        }

        if(this.right == true && this.up == true)
        {
            player.setVelocityX(110);
            player.setVelocityY(-110);
        }

        /// stop le player si il ne bouge pas
        if(this.left == false && this.right == false)
        {
            player.setVelocityX(0);
        }

        if(this.up == false && this.down == false)
        {
            player.setVelocityY(0);
        }

        /// anim neutre
        if(this.left == false && this.right == false && this.left == false && this.right == false)
        {
            player.anims.play('turn', true);
        }

///////////////////////////////////////////////////////////

        ////lancer armes////
        this.space = this.cursors.space.isDown ? true : false;

        if(this.space == true)
        {
            if(timerknives>=100 && knivesOut == false)
            {
                timerknives = 0;
            }

            if(timerknives==0)
            {
                knives = this.physics.add.image(player.x+10, player.y, 'knife')
                //knife collide
                this.physics.add.collider(knives, this.plateformes,KnivesDisable);
                this.physics.add.collider(knives, wolf,KnivesWolf);
                //
                knivesOut = true;
            }
        }

        if(knivesOut==true)
        {
            KnivesThrow();
        }

        if(timerknives>=100 && knivesOut == true)
        {
            KnivesDisable();
        }
    }
}

function KnivesThrow()
{
    knives.setVelocityX(400); 
}

function KnivesDisable()
{
    knives.disableBody(true,true);
    knivesOut = false;
}

function KnivesWolf()
{
    KnivesDisable();
    wolf.disableBody(true,true);
}


function Wolf()
{
    ///////////////////////////////////////////////////////  Ennemie  ////////////////////////////////////////////////////////////

    // Ennemi patern
    
    timeMove = timeMove+1;

    if(timeMove <= 150)
    {
        wolf.anims.play('WolfLeft',true);
        wolf.setVelocityX(-400);
    }
    else if(timeMove > 150 && timeMove <=300 )
    {
        wolf.anims.play('WolfRight',true);
        wolf.setVelocityX(400);
    }
    else
    {
        timeMove =  0;
    }
}

function PlayerWolf()
{   
    LoseLife();
}

function LoseLife()
{   
    if(invulnerable >= 200)
    {
        invulnerable = 0;
    }
    if(invulnerable==0)
    {
        vie = vie-1;
    }      
}

function Life()
{   
    //affichage
    vieTexte.setText('vie= ' + vie);

    if(vie<=0)
    {
        gameOver=true;
    }
}


////////////
