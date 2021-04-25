
class lvl1 extends Phaser.Scene //
{
    constructor()
    {
        super("lvl1"); 
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
        //  Input Events
        cursors = this.input.keyboard.createCursorKeys();
        cursors.left.reset();
        cursors.right.reset();
        cursors.up.reset();
        cursors.down.reset();

        // chargement de la carte
        this.carteDuNiveau = this.add.tilemap("carte");

        // chargement du jeu de tuiles
        this.tileset = this.carteDuNiveau.addTilesetImage("TuileGame","Phaser_tuilesdejeu");  
        
        // chargement du calque calque_background
        this.backgroundLayer = this.carteDuNiveau.createStaticLayer("calque_background_1",this.tileset,0,0);

        //POOORRRTTTEEE
        door = this.physics.add.staticGroup();
        door.create(770,256,'door');
        //

        // chargement du calque calque_background_2
        this.Lvl2Tp = this.carteDuNiveau.createStaticLayer("Lvl-tp",this.tileset,0,0);

        // chargement du calque calque_plateformes
        this.plateformes = this.carteDuNiveau.createStaticLayer("calque_plateformes",this.tileset,0,0);


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


        //Ghost 
        ghost= this.physics.add.image(700,620,'Ghost');
        ghost.setScale(2);

        // The ennemi and its settings
        this.wolf = this.physics.add.sprite(700, 500, 'wolf').setScale(0.5);
        this.wolf.setCollideWorldBounds(true);

        
        //On creer le projetcile
        knives = this.physics.add.image(0,0,'knife');
        knives.disableBody(true,true);

        //on creer l'item qui debloque les projectile
        knife = this.physics.add.image(50,150,'knife').setScale(1.8);

        knife.body.setSize(29,15);
        knife.body.setOffset(6,7);

        knifeUI=this.physics.add.image(50,510,'knifeUI').setScrollFactor(0,0);
        knifeUI.setScale(1.4);
        knifeUI.setAlpha(0);

        //on creer les Keys
        key = this.physics.add.image(0,0,'key');
        key.disableBody(true,true);

        //keyui
        keyUI=this.physics.add.image(50,440,'keyUI').setScrollFactor(0,0);
        keyUI.setScale(1.4);
        keyUI.setAlpha(0);


        //VIE
        lifeFullUI=this.physics.add.image(40,40,'LifeFull').setScrollFactor(0,0);
        lifeFullUI.setScale(2);

        lifeMidUI=this.physics.add.image(40,40,'LifeMid').setScrollFactor(0,0);
        lifeMidUI.setScale(2);

        lifeLowUI=this.physics.add.image(40,40,'LifeLow').setScrollFactor(0,0);
        lifeLowUI.setScale(2);

        lifeOutUI=this.physics.add.image(40,40,'LifeOut').setScrollFactor(0,0);
        lifeOutUI.setScale(2);


        //Life
        if(vie<=1)
        {
            vieDrop = this.physics.add.image(32,400,'LifeLow');
            vieDrop.setScale(1.3);
        }

        //Money
        if(money==0)
        {
            moneyDrop = this.physics.add.image(32,300,'Money');
            moneyDrop.setScale(1.5);
        }

        //MoneyUI
        moneyUI = this.physics.add.image(150,40,'MoneyUI').setScrollFactor(0,0);;
        moneyTexte = this.add.text(160, 20, money, { fontSize: '52px', fill: '#000' }).setScrollFactor(0,0);;
        moneyUI.setScale(2);



//////////player Collider//////////
        this.physics.add.collider(player, this.Lvl2Tp,Tplvl);
        this.physics.add.collider(player, this.plateformes);
        this.physics.add.overlap(player, knife,KnifePlayer);

        //Wolf collider
        this.physics.add.collider(this.wolf, this.plateformes);
        this.physics.add.collider(this.wolf, player,PlayerWolf);

        //door collider
        this.physics.add.collider(player, door,PlayerDoor);
        this.physics.add.collider(this.wolf, door);

        //Life collide
        this.physics.add.collider(player, vieDrop,PlayerVie);

        //Money collide
        this.physics.add.collider(player,moneyDrop,PlayerMoney);

        //Ghost collide

        /* IMPORTANT c'est pour les child d'objet  
        vieDrop = this.physics.add.group({key: 'LifeLow',repeat: 2,setXY: { x: 32, y: 400, stepY: 50 }});
        
        this.physics.add.overlap(player, vieDrop, PlayerVie, null, this);
        */
        
                
        /*left = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
        right = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.Q);
        up = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.Z);
        down = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);*/
        
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
            player.x = 100;
            player.y = 70;
            vie = 1;
            gameOver = false;
            //return;
        }

        playerY=player.y;

        if(knifeUnlock==true)
        {
            knife.disableBody();
            knife.setAlpha(0);
        }

        if(door1==true)
        {
            door.destroy(true,true);
        }

        //key drop

        if(wolfDead1==true)
        {
            this.wolf.disableBody(true,true);

            if(key1==true)
            {
                key = this.physics.add.image(this.wolf.x, this.wolf.y,'key');
                this.physics.add.collider(player, key,PlayerKey);
                key1=false;
            }
        }
       


        //Var timer update : //
        invulnerable++;
        timerknives++;

        //fonction ARMES : //


        //fonction  l'ennemie--wolf//
        this.Wolf();

//////////////Fonction UI//////////////
        //Actualise la vie
        Life();

        KeyAffichage();

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
                    this.physics.add.collider(knives, door,KnivesDisable);
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
            this.scene.start("lvl2");
            playerX=20;
            tp=false;
        }
        else
        {   
        }
        
    }

    KnivesWolf()
    {
        KnivesDisable();
        wolfDead1 = true;
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

/*function PlayerVie()
{
    vieDrop.disableBody(true, true);
    //vie++;
}*/






////////////
