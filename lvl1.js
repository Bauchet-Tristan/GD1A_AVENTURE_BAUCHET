
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


    preload()
    {
        //chargement des tuilles
        this.load.image("phaser_tuilesdejeu","assets/tuilesJeu.png");

        //chargement de la carte
        this.load.tilemapTiledJSON("carte", "assets/map.json");

        this.load.image('sky', 'assets/sky.png');
        this.load.image('ground', 'assets/platform.png');
        this.load.spritesheet('dude', 'assets/dude.png', { frameWidth: 32, frameHeight: 48 });
    }

    create()
    {
        //chargement de la carte
        const carteDuNiveau = this.add.tilemap("carte");

        // chargement du jeu de tuiles
        const tileset = carteDuNiveau.addTilesetImage(
            "tuiles_de_jeu",
            "Phaser_tuilesdejeu"
        );  

        // chargement du calque calque_background_1
        const backgroundLayer = carteDuNiveau.createStaticLayer(
            "calque_background_1",
            tileset
        );

        // chargement du calque calque_background_2
        const backgroundLayer2 = carteDuNiveau.createStaticLayer(
            "calque_background_2",
            tileset
        );

        // chargement du calque calque_plateformes
        const plateformes = carteDuNiveau.createStaticLayer(
            "calque_plateformes",
            tileset
        );  

        plateformes.setCollisionByProperty({ estSolide: true });

////////////////////////////////
        // The player and its settings
        player = this.physics.add.sprite(100, 450, 'dude');

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

        this.physics.world.setBounds(0, 0, 3200, 640);
        //  ajout du champs de la caméra de taille identique à celle du monde
        this.cameras.main.setBounds(0, 0, 3200, 640);
        // ancrage de la caméra sur le joueur
        this.cameras.main.startFollow(player);  

        //  Input Events
        cursors = this.input.keyboard.createCursorKeys();

        //  Some stars to collect, 12 in total, evenly spaced 70 pixels apart along the x axis

        this.physics.add.collider(player, plateformes);
    }


    update()
    {   
        if (gameOver)
        {
            return;
        }
    
        if (cursors.left.isDown)
        {
            player.setVelocityX(-160);
    
            player.anims.play('left', true);
        }
        else if (cursors.right.isDown)
        {
            player.setVelocityX(160);
    
            player.anims.play('right', true);
        }
        else
        {
            player.setVelocityX(0);
    
            player.anims.play('turn');
        }
    
        if (cursors.up.isDown && player.body.blocked.down) 
        {
            player.setVelocityY(-200);
        }  
    }
}
/*
function Touching()
{
    score++;
    console.log(score);
}*/


////////////
