
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
    }

    create()
    {
        this.add.text(20,20, "menu");  
        cursors = this.input.keyboard.createCursorKeys();
    }

    

    update()
    {
        score ++;
        console.log(score);

        if(cursors.up.isDown)
        {  
            this.change=1;
        }

        if (cursors.up.isUp && this.change==1 )
        {
            this.change=0;
            this.scene.start("lvl1");
        }

        else if(score == 100)
        {
            console.log("tes revenu woaw");
        }
    }

}


////////////

