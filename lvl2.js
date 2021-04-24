
class lvl2 extends Phaser.Scene //
{
    constructor()
    {
        super("lvl2"); 
    }

    init(data)
    {
        //dispo partout
    }


    preload ()
    {
        this.load.image("Phaser_tuilesdejeu", "TuileGame.png");
        this.load.tilemapTiledJSON("carte", "map.json");
    }

    create ()
    {
        
        // chargement de la carte
        this.carteDuNiveau = this.add.tilemap("carte");

        // chargement du jeu de tuiles
        this.tileset = this.carteDuNiveau.addTilesetImage("TuileGame","Phaser_tuilesdejeu");  
        
        // chargement du calque calque_background
        this.backgroundLayer = this.carteDuNiveau.createStaticLayer("calque_background_1",this.tileset,-960,0);

        // chargement du calque calque_background_2
        this.Lvl2Tp = this.carteDuNiveau.createStaticLayer("Lvl-tp",this.tileset,-960,0);

        // chargement du calque calque_plateformes
        this.plateformes = this.carteDuNiveau.createStaticLayer("calque_plateformes",this.tileset,-960,0);


        this.plateformes.setCollisionByExclusion(-1, true);
        this.Lvl2Tp.setCollisionByExclusion(-1, true);
        

        // The player and its settings
        player = this.physics.add.sprite(playerX, playerY, 'dude');
        player.setCollideWorldBounds(true);

        player.body.setSize(28,17);
        player.body.setOffset(2,25);

        //---Camera
        this.cameras.main.setSize(960,540);
        this.cameras.main.setBounds(0,0,950,700);
        this.cameras.main.startFollow(player,true,1,1);

        // The ennemi and its settings
        this.wolf = this.physics.add.sprite(700, 500, 'wolf').setScale(0.5);
        this.wolf.setCollideWorldBounds(true);

        
        //  Input Events
        cursors = this.input.keyboard.createCursorKeys();

        // affiche vie 
        vieTexte = this.add.text(16, 16, 'vie: 0', { fontSize: '32px', fill: '#999' });

        //On creer le projetcile
        knives = this.physics.add.image(0,0,'knife');
        knives.disableBody(true,true);

        knifeUI=this.physics.add.image(50,510,'knifeUI').setScrollFactor(0,0);
        knifeUI.setScale(1.8);
        knifeUI.setAlpha(0);


        keyUI=this.physics.add.image(50,440,'keyUI').setScrollFactor(0,0);
        keyUI.setScale(1.8);
        keyUI.setAlpha(0);

//////////player Collider//////////
        this.physics.add.collider(player, this.Lvl2Tp,Tplvl);
        this.physics.add.collider(player, this.plateformes);

        //Wolf collider
        this.physics.add.collider(this.wolf, this.plateformes);
        this.physics.add.collider(this.wolf, player,PlayerWolf);        
                
        /*left = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
        right = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.Q);
        up = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.Z);
        down = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);*/

        cursors.left.reset();
        cursors.right.reset();
        cursors.up.reset();
        cursors.down.reset();
    
    }
    
//////////////
//////////////
//////////////
//////////////
//////////////
//////////////
//////////////      Update
//////////////
//////////////
//////////////
//////////////
//////////////
//////////////



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

        playerY=player.y;
        //key drop
        if(wolfDead2==true)
        {
            this.wolf.disableBody(true,true);
        }
       


        //Var timer update : //
        invulnerable++;
        timerknives++;

        //fonction  l'ennemie--wolf//
        this.Wolf();

//////////////Fonction UI//////////////
        //Actualise la vie
        Life();

        if(keyNumber>=1)
        {
            keyUI.setAlpha(1);
        }

        if(knifeUnlock==true)
        {
            knifeUI.setAlpha(1); 
        }

        
        ///////////////////////////////////////////////////
        /////////////   Déplacement basic :   /////////////   

        /// On enregistre les commandes ///
        left=cursors.left.isDown ? true : false;
        right=cursors.right.isDown ? true : false;
        up=cursors.up.isDown ? true : false;
        down=cursors.down.isDown ? true : false;

        //this.left.reset();

        if (left==true)
        {
            lastDirection ="left";
            player.setVelocityX(-150);
            player.anims.play('left', true);
        }
        if (right == true)
        {
            lastDirection ="right";
            player.setVelocityX(150);
            player.anims.play('right', true);
        }
        if (up == true) 
        {
            lastDirection ="up";
            player.setVelocityY(-150);
        }  
        if (down == true) 
        {
            lastDirection ="down";
            player.setVelocityY(150);
        }  
        

        ///equilibre la vitesse des deplacement en diagonale
        if(left == true && up == true)
        {
            player.setVelocityX(-110);
            player.setVelocityY(-110);
        }

        if(left == true && down == true)
        {
            player.setVelocityX(-110);
            player.setVelocityY(110);
        }

        if(right == true && down == true)
        {
            player.setVelocityX(110);
            player.setVelocityY(110);
        }

        if(right == true && up == true)
        {
            player.setVelocityX(110);
            player.setVelocityY(-110);
        }

        /// stop le player si il ne bouge pas
        if(left == false && right == false)
        {
            player.setVelocityX(0);
        }

        if(up == false && down == false)
        {
            player.setVelocityY(0);
        }

        /// anim neutre
        if(left == false && right == false && left == false && right == false)
        {
            player.anims.play('turn', true);
        }

///////////////////////////////////////////////////////////

        ////lancer armes////
        space=cursors.space.isDown ? true : false;

        if(space == true)
        {
            if(knifeUnlock==true)
            {
                if(timerknives>=100 && knivesOut == false)
                {
                    timerknives = 0;
                }

                if(timerknives==0)
                {
                    knives = this.physics.add.image(player.x, player.y, 'knife');
                    //knives collide
                    this.physics.add.collider(knives, this.plateformes,KnivesDisable);
                    this.physics.add.collider(knives, this.wolf,this.KnivesWolf); 

                    KnivesThrow();
                }
            }
            else
            { 
                console.log("pas encore debloquer le couteau");
            }
        }

        if(timerknives>=100 && knivesOut == true)
        {
            KnivesDisable();
        }  
        
        //console.log(tp);
        if(tp==true)
        {
            this.scene.start("lvl1");
            playerX = 900;
            tp=false;
        }
        else
        {   
        }
    }
    KnivesWolf()
    {
        KnivesDisable();
        wolfDead2 = true;
    }


    Wolf()
    {
       // Ennemi patern
        timeMove = timeMove+1;
        this.wolf.setVelocityY(0);
        if(timeMove <= 150)
        {
            this.wolf.anims.play('WolfLeft',true);
            this.wolf.setVelocityX(-400);
        }
        else if(timeMove > 150 && timeMove <=300 )
        {
            this.wolf.anims.play('WolfRight',true);
            this.wolf.setVelocityX(400);
        }
        else
        {
            timeMove =  0;
        }
    }

}



////////////
