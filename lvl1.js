
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

        
        this.load.spritesheet('dude', 'assets/dude.png', { frameWidth: 32, frameHeight: 48 });
    }

    create ()
    {
        this.left = true;
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


        //  Player physics properties. Give the little guy a slight bounce.
        player.setCollideWorldBounds(true);

        //  Our player animations, turning, walking left and walking right.
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

        //  Input Events
        this.cursors = this.input.keyboard.createCursorKeys();

        this.physics.add.collider(player, this.plateformes);
        this.physics.add.collider(player, this.objet);
    }

    

    update ()
    {
        if (gameOver)
        {
            return;
        }

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
////////////////////////////////////////////////////
    }
}



////////////
