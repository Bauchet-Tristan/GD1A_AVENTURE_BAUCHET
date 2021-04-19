
class Menu extends Phaser.Scene //
{
    constructor()
    {
        super("Menu"); //nom = menu
    }

    init(data)
    {
        //dispo partout
    }

    preload()
    {
        this.change=0;
        this.load.spritesheet('dude', 'assets/dude.png', { frameWidth: 32, frameHeight: 42 });
        this.load.spritesheet('wolf', 'assetsSide/wolf.png', { frameWidth: 211, frameHeight: 106 });

        this.load.image("knife","assets/Knife.png");
        this.load.image("knifeUI","assets/KnifeInventory.png");
        this.load.image("key","assets/Key.png");
        this.load.image("keyUI","assets/KeyInventory.png");
        this.load.image("door","assets/Door.png");
    }

    create()
    {
        this.add.text(20,20, "Menu");  

        ///////////les anims
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
    }

    

    update()
    {
        score ++;

        if(score >= 1)
        {
            this.scene.start("lvl1");
        }
    }

}




function Tplvl()
{
    tp=true;
    console.log("dfv");
} 


function KnifePlayer()
{
    knifeUnlock = true;
    knife.disableBody(true,true);
    knifeUI.setAlpha(1);
}

function KnivesThrow()
{
    knives.setScale(1.8);
    if(lastDirection =="left" && knivesOut==false)
    {
        knives.rotation +=3.15;

        knives.body.setSize(29,15);
        knives.body.setOffset(6,7);

        knives.setVelocityX(-400);    
    }
    else if(lastDirection =="right"&& knivesOut==false)
    {
        knives.setVelocityX(400); 
        knives.body.setSize(29,15);
        knives.body.setOffset(6,7);
    }
    else if(lastDirection =="up"&& knivesOut==false)
    {
        knives.rotation +=-1.55;
        knives.body.setSize(15,22);
        knives.body.setOffset(12,4);
        knives.setVelocityY(-400); 
    }
    else if(lastDirection =="down"&& knivesOut==false)
    {
        knives.rotation += 1.55;
        knives.body.setSize(17,22);
        knives.body.setOffset(12,4);
        knives.setVelocityY(400); 
    }

    knivesOut = true;
}



function PlayerDoor()
{
    if(keyNumber>=1)
    {
        door1=true;
    }    
}

function PlayerKey()
{
    key.disableBody(true,true);
    keyNumber++;
}

function KnivesDisable()
{
    knives.disableBody(true,true);
    knivesOut = false;
}

function KnivesWolf()
{
    KnivesDisable();
    wolf1=false;
    wolf.disableBody(true,true);
    wolfDead =true;
}


function Wolf()
{
    ///////////////////////////////////////////////////////  Ennemie  ////////////////////////////////////////////////////////////

    // Ennemi patern
    
    timeMove = timeMove+1;
    wolf.setVelocityY(0);
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

