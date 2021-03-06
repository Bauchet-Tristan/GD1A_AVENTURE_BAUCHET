
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
        // input event
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
        this.backgroundLayer = this.carteDuNiveau.createStaticLayer("calque_background_1",this.tileset,-960,0);

        // chargement du calque calque_background_2
        this.Lvl2Tp = this.carteDuNiveau.createStaticLayer("Lvl-tp",this.tileset,-960,0);

        // chargement du calque calque_plateformes
        this.plateformes = this.carteDuNiveau.createStaticLayer("calque_plateformes",this.tileset,-960,0);

        this.plateformes.setCollisionByExclusion(-1, true);
        this.Lvl2Tp.setCollisionByExclusion(-1, true);
        
        //retouche map 
        this.retouche = this.carteDuNiveau.createStaticLayer("retouche_wall",this.tileset,-960,0);

        //porte
        door = this.physics.add.staticGroup();
        door.create(897,671,'door');

        // The player and its settings
        player = this.physics.add.sprite(playerX,playerY, 'dude');
        player.setScale(2);
        player.setCollideWorldBounds(true);

        player.body.setSize(13,10);
        player.body.setOffset(2,11);

        //---Camera
        this.cameras.main.setSize(960,540);
        this.cameras.main.setBounds(0,0,950,830);
        this.cameras.main.startFollow(player,true,1,1);

        // The ennemi and its settings
        this.wolf = this.physics.add.sprite(700, 500, 'wolf').setScale(0.5);
        this.wolf.setCollideWorldBounds(true);

        winText = this.add.text(300, 400, '', { fontSize: '200px', fill: '#000' });

        //On creer le projetcile
        knives = this.physics.add.image(0,0,'knife');
        knives.disableBody(true,true);

        knifeUI=this.physics.add.image(50,510,'knifeUI').setScrollFactor(0,0);
        knifeUI.setScale(1.4);
        knifeUI.setAlpha(0);


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

        if(vie<=2)
        {
            vieDrop = this.physics.add.image(400,100,'LifeLow');
            vieDrop.setScale(1.3);
        }
 
         //MoneyUI
         moneyUI = this.physics.add.image(150,40,'MoneyUI').setScrollFactor(0,0);;
         moneyTexte = this.add.text(160, 20, money, { fontSize: '52px', fill: '#000' }).setScrollFactor(0,0);;
         moneyUI.setScale(2);

//////////player Collider//////////
        this.physics.add.collider(player, this.Lvl2Tp,Tplvl);
        this.physics.add.collider(player, this.plateformes);

        //Wolf collider
        this.physics.add.collider(this.wolf, this.plateformes);
        this.physics.add.collider(this.wolf, player,PlayerWolf);   
        
        //Door
        this.physics.add.collider(player, door,PlayerDoor2);
        this.physics.add.collider(this.wolf, door);

        //Life collide
        this.physics.add.collider(player, vieDrop,PlayerVie);

        //Money collide

                
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
        if(player.x>=830 && player.y>=671)
        {
            this.physics.pause();
            winText.setText("Gagn??");
        }

        if (gameOver)
        {
            player.x = 100;
            player.y = 70;
            vie = 1;
            gameOver = false;
            //return;
        }

        playerY=player.y;


        //key drop
        if(wolfDead2==true)
        {
            this.wolf.disableBody(true,true);

            if(money1==true)
            {
                moneyDrop = this.physics.add.image(this.wolf.x,this.wolf.y,'Money');
                moneyDrop.setScale(1.5);

                this.physics.add.collider(player,moneyDrop,PlayerMoney);
                money1=false;
            }
        }
       
        if(door2==true)
        {
            door.destroy(true,true);
        }

        //Var timer update : //
        invulnerable++;
        timerknives++;

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
        /////////////   D??placement basic :   /////////////   

        this.input.gamepad.once('connected', function (pad) {paddleConnected = true;paddle = pad;});
        
        if(paddleConnected==true)
        {
            if (this.input.gamepad.total === 0)
            {
                return;
            }

            var pad = this.input.gamepad.getPad(0);

            var Abutton = pad.A; 

            if (Abutton)
            {
                space=true;
            }
            else{
                space=false;
            }

            if (pad.axes.length)
            {
                var axisH = pad.axes[0].getValue();
                var axisV = pad.axes[1].getValue();

                if(axisH<0)
                {
                    left=true;
                    right=false;
                }
                else if( axisH>0)
                {
                    left=false;
                    right=true;
                }
                else
                {
                    right=false;
                    left=false;
                }

                /////

                if(axisV<0)
                {
                    up=true;
                    down=false;
                }
                else if( axisV>0)
                {
                    up=false;
                    down=true;
                }
                else
                {
                    down=false;
                    up=false;
                }
            }
        }
        else{
        left=cursors.left.isDown || xAxis > 0 ? true : false;
        right=cursors.right.isDown || xAxis < 0 ? true : false;
        up=cursors.up.isDown || yAxis > 0 ? true : false;
        down=cursors.down.isDown || yAxis < 0 ? true : false;

        space=cursors.space.isDown ? true : false;
        }

        if (left==true)
        {
            lastDirection ="left";
            player.setVelocityX(-150);
            player.anims.play('left', true);
        }
        else if (right == true)
        {
            lastDirection ="right";
            player.setVelocityX(150);
            player.anims.play('right', true);
        }
        else if (up == true) 
        {
            lastDirection ="up";
            player.setVelocityY(-150);
            player.anims.play('up', true);
        }  
        else if (down == true) 
        {   
            lastDirection ="down";
            player.setVelocityY(150);
            player.anims.play('down', true);
        }  
        

        ///equilibre la vitesse des deplacement en diagonale
        if(left == true && up == true)
        {
            player.setVelocityX(-110);
            player.setVelocityY(-110);
            player.anims.play('left', true);
        }

        if(left == true && down == true)
        {
            player.setVelocityX(-110);
            player.setVelocityY(110);
            player.anims.play('left', true);
        }

        if(right == true && down == true)
        {
            player.setVelocityX(110);
            player.setVelocityY(110);
            player.anims.play('right', true);
        }

        if(right == true && up == true)
        {
            player.setVelocityX(110);
            player.setVelocityY(-110);
            player.anims.play('right', true);
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
        if(left == false && right == false && left == false && right == false && up == false && down == false)
        {
            player.anims.play('turn', true);
        }

///////////////////////////////////////////////////////////

        ////lancer armes////

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
